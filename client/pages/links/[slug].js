import { useState, useEffect, Fragment } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API, APP_NAME } from '../../config';
import InfiniteScroll from 'react-infinite-scroller';
import { embed } from 'react-html-attributes';
import Body from '../../components/Body';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import { Card, CardContent, CardHeader, Grid, Typography, Box, TextField} from '@material-ui/core';

const Links = ({ query, category, links, totalLinks, linksLimit, linkSkip }) => {
    const [allLinks, setAllLinks] = useState(links);
    const [limit, setLimit] = useState(linksLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalLinks);
    const [popular, setPopular] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');


    const stripHTML = data => data.replace(/<\/?[^>]+(>|$)/g, '');

    const head = () => (
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>
            <meta name="description" content={stripHTML(category.content.substring(0, 160))} />
            <meta property="og:title" content={category.name} />
            <meta property="og:description" content={stripHTML(category.content.substring(0, 160))} />
            <meta property="og:image" content={category.image.url} />
            <meta property="og:image:secure_url" content={category.image.url} />
        </Head>
    );

    useEffect(() => {
        loadPopular();
    }, []);

    const loadPopular = async () => {
        const response = await axios.get(`${API}/link/popular/${category.slug}`);
        // console.log(response);
        setPopular(response.data);
    };

    const handleClick = async linkId => {
        const response = await axios.put(`${API}/click-count`, { linkId });
        loadPopular();
    };

    const loadUpdatedLinks = async () => {
        const response = await axios.post(`${API}/category/${query.slug}`);
        setAllLinks(response.data.links);
    };

   
// const listOfPopularLinks = () => (
//     <Box display="flex" flexDirection="column">
//       {popular.map((l, i) => (
//         <Box key={i} bgcolor="grey.100" p={2} my={2}>
//           <Box display="flex" justifyContent="space-between">
//             <Box>
//               <Typography variant="h5">
//                 <a href={l.url} target="_blank">
//                   {l.title}
//                 </a>
//               </Typography>
//               <Typography variant="subtitle2" color="textSecondary">
//                 {l.url}
//               </Typography>
//             </Box>
//             <Box>
//               <Typography variant="subtitle2" color="textSecondary">
//                 {moment(l.createdAt).fromNow()} by {l.postedBy.name}
//               </Typography>
//             </Box>
//           </Box>
  
//           <Box display="flex" alignItems="center" mt={1}>
//             <Typography variant="body1" color="textPrimary" component="span">
//               {l.type} {l.medium}
//             </Typography>
//             <Box ml={2}>
//               {l.categories.map((c, i) => (
//                 <Box key={i} component="span" mr={1}>
//                   <Typography variant="body1" color="textPrimary" component="span">
//                     {c.name}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//             <Box ml="auto">
//               <Typography variant="body1" color="textSecondary" component="span">
//                 {l.clicks} clicks
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   );

        const filteredLinks = allLinks.filter(link =>
            link.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        const listOfLinks = () => (
            <Grid container spacing={2}>
            <TextField
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            />

            {filteredLinks.map((l, i) => (
                <Grid item xs={12} key={i}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item md={4}>
                        {l.image && l.image.url && (
                          <img
                            src={l.image.url}
                            alt={l.title}
                            onError={(e) => console.log('Error loading image', e)}
                            style={{ width: '100%' }}
                          />
                        )}
                      </Grid>
                      <Grid item md={8} onClick={(e) => handleClick(l._id)}>
                        <CardHeader
                          title={<a href={l.url} target="_blank">{l.title}</a>}
                        //   subheader={l.url}
                        />
                        <CardContent>
                          {l.url.endsWith('.pdf') ? (
                            <a href={l.url} download>
                              <Typography>Click to download</Typography>
                            </a>
                          ) : (
                            <Typography>{l.description}</Typography>
                          )}
                        </CardContent>
                      </Grid>
                      <Grid item xs={12}>
                        <CardContent>
                          <Grid container spacing={1}>
                            <Grid item>
                              {/* <Typography variant="subtitle2">{l.type} / {l.medium}</Typography> */}
                            </Grid>
                            {l.categories.map((c, i) => (
                              <Grid item key={i}>
                                <span className="badge text-success">{c.name}</span>
                              </Grid>
                            ))}
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" align="right">{l.clicks} Popularity</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          );
    
      

    const loadMore = async () => {
        let toSkip = skip + limit;
        const response = await axios.post(`${API}/category/${query.slug}`, { skip: toSkip, limit });
        setAllLinks([...allLinks, ...response.data.links]);
        console.log('allLinks', allLinks);
        console.log('response.data.links.length', response.data.links.length);
        setSize(response.data.links.length);
        setSkip(toSkip);
    };

    return (
        <React.Fragment>
            <Nav />
            <Body>
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="display-4 font-weight-bold">{category.name} - Posts</h1>
                    </div>
                    <div className="col-md-4">
                        {/* <img
                            src={category.image.url}
                            alt={category.name}
                            style={{ width: 'auto', maxHeight: '200px' }}
                        /> */}
                    </div>
                </div>
                <br />
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={size > 0 && size >= limit}
                    loader={<img key={0} src="/static/images/loading.gif" alt="loading" />}
                >
                    <div className="row">
                        <div className="col-md-8">{listOfLinks()}</div>
                        <div className="col-md-4">
                            {/* <h2 className="lead">Most popular in {category.name}</h2> */}
                            {/* <div className="p-3">{listOfPopularLinks()}</div> */}
                        </div>
                    </div>
                </InfiniteScroll>
                </Body>
                <Footer />
        </React.Fragment>
    );
};

Links.getInitialProps = async ({ query, req }) => {
    let skip = 0;
    let limit = 2;

    const response = await axios.post(`${API}/category/${query.slug}`, { skip, limit });
    return {
        query,
        category: response.data.category,
        links: response.data.links,
        totalLinks: response.data.links.length,
        linksLimit: limit,
        linkSkip: skip
    };
};

export default Links;