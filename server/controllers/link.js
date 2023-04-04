const Link = require('../models/link');
const LinkId = require('../models/linkid');

const User = require('../models/user');
const Category = require('../models/category');
const slugify = require('slugify');
const { linkPublishedParams } = require('../helpers/email');
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');



const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

// exports.createFile = (req, res) => {
//     const { title, description, categories, type, medium } = req.body;
//     const slug = slugify(title);
//     const file = req.files.file;
//     const S3_BUCKET = process.env.S3_BUCKET_NAME;
//     const s3 = new AWS.S3({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         region: process.env.AWS_REGION
//     });
//     const fileType = file.mimetype.split('/')[1];
//     const fileName = `${uuidv4()}.${fileType}`;
//     const fileParams = {
//         Bucket: S3_BUCKET,
//         Key: `link/${fileName}`,
//         Body: file.data,
//         ACL: 'public-read',
//         ContentType: file.mimetype
//     };

//     const link = new Link({ title, description, categories, type, medium, slug });
//     link.postedBy = req.user._id;

//     s3.upload(fileParams, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(400).json({ error: 'Upload to s3 failed' });
//         } else {
//             console.log('AWS UPLOAD RES DATA', data);
//             link.file.url = data.Location;
//             link.file.key = data.Key;

//             link.save((err, data) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: 'Link already exists'
//                     });
//                 }
//                 res.json(data);
//             });
//         }
//     });
// };


exports.create = (req, res) => {
    const { title, description, url, image, file, categories, type, medium } = req.body;
    const slug = url;
    let link = new Link({ title, description, url, categories, type, medium, slug });
    let params = {};

    if (image) {
        const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const imagetype = image.split(';')[0].split('/')[1];

        params = {
            Bucket: 'awsbucket-youngdev',
            Key: `link/${uuidv4()}.${imagetype}`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/${imagetype}`
        };
    } else if (file) {
        const base64Data = new Buffer.from(file.replace(/^data:application\/\w+;base64,/, ''), 'base64');
        const filetype = file.split(';')[0].split('/')[1];

        params = {
            Bucket: 'awsbucket-youngdev',
            Key: `link/${uuidv4()}.${filetype}`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `application/pdf`
        };
    } else {
        return res.status(400).json({ error: 'No image or file provided' });
    }

    console.log(params);
    // posted by user
    link.postedBy = req.user._id;
    // save link

    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: 'Upload to s3 failed' });
        } else {
            console.log('AWS UPLOAD RES DATA', data);
            if (image) {
                link.image.url = data.Location;
                link.image.key = data.Key;
            } else if (file) {
                link.file.url = data.Location;
                link.file.key = data.Key;
            }
            // posted by
            link.postedBy = req.user._id;
            link.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Link already exist'
                    });
                }
                res.json(data);
                // find all users in the category
                User.find({ categories: { $in: categories } }).exec((err, users) => {
                    if (err) {
                        throw new Error(err);
                        console.log('Error finding users to send email on link publish');
                    }
                    Category.find({ _id: { $in: categories } }).exec((err, result) => {
                        data.categories = result;

                        for (let i = 0; i < users.length; i++) {
                            const params = linkPublishedParams(users[i].email, data);
                            const sendEmail = ses.sendEmail(params).promise();

                            sendEmail
                                .then(success => {
                                    console.log('email submitted to SES ', success);
                                    return;
                                })
                                .catch(failure => {
                                    console.log('error on email submitted to SES  ', failure);
                                    return;
                                });
                        }
                    });
                });
            });
        }
    });
};



exports.list = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Link.find({})
        .populate('postedBy', 'name')
        .populate('categories', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Could not list links'
                });
            }
            res.json(data);
        });
};

exports.read = (req, res) => {
    const { id } = req.params;
    Link.findOne({ _id: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Error finding link'
            });
        }
        res.json(data);
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { title, description, url, categories, type, medium, image } = req.body;
    const updatedLink = { title, url, description, categories, type, medium };
    const imagetype = image.split(';')[0].split('/')[1];
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const params = {
        Bucket: 'awsbucket-youngdev',
        Key: `link/${uuidv4()}.${imagetype}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${imagetype}`
    };

    Link.findById(id).exec((err, link) => {
        if (err || !link) {
            return res.status(400).json({
                error: 'Link not found'
            });
        }

        if (image) {
            // Delete the old image from S3
            const oldKey = link.image.split('/').pop();
            const s3 = new AWS.S3();
            const deleteParams = {
                Bucket: 'awsbucket-youngdev',
                Key: `content/${oldKey}`,
            };

            s3.deleteObject(deleteParams, (err, data) => {
                if (err) {
                    console.log(err);
                }
            });

            // Upload the new image to S3
            s3.upload(params, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({
                        error: 'Image upload failed'
                    });
                }
                updatedLink.image = data.Location;

                // Update the link in the database
                Link.findOneAndUpdate({ _id: id }, updatedLink, { new: true }).exec((err, updated) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Error updating the link'
                        });
                    }
                    res.json(updated);
                });
            });
        } else {
            // Update the link in the database without changing the image
            Link.findOneAndUpdate({ _id: id }, updatedLink, { new: true }).exec((err, updated) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Error updating the link'
                    });
                }
                res.json(updated);
            });
        }
    });
};


exports.remove = (req, res) => {
    const { id } = req.params;
    Link.findOneAndRemove({ _id: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Error removing the link'
            });
        }
        res.json({
            message: 'Link removed successfully'
        });
    });
};

exports.clickCount = (req, res) => {
    const { linkId } = req.body;
    Link.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } }, { upsert: true, new: true }).exec((err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Could not update view count'
            });
        }
        res.json(result);
    });
};

exports.popular = (req, res) => {
    Link.find()
        .populate('postedBy', 'name')
        .sort({ clicks: -1 })
        .limit(3)
        .exec((err, links) => {
            if (err) {
                return res.status(400).json({
                    error: 'Links not found'
                });
            }
            res.json(links);
        });
};

exports.popularInCategory = (req, res) => {
    const { slug } = req.params;
    console.log(slug);
    Category.findOne({ slug }).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'Could not load categories'
            });
        }

        Link.find({ categories: category })
            .sort({ clicks: -1 })
            .limit(3)
            .exec((err, links) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Links not found'
                    });
                }
                res.json(links);
            });
    });
};


