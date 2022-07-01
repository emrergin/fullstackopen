const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>{
    if (blogs.length===0){return 0;}
    else if(blogs.length===1){return blogs[0].likes}
    else{
        return blogs.reduce((pre,cur)=>pre+cur.likes,0);
    }
}

const favoriteBlog  = (blogs) =>{
    return blogs.reduce((pre,cur)=> pre.likes> cur.likes? pre : cur ,{});
}

const mostBlogs  = (blogs) =>{
    const pairsObject =  blogs.reduce((pre,cur)=> {
        pre[cur.author]= pre[cur.author]? pre[cur.author]+1 : 1
        return pre
},{});
    let  authorBlogPairs = Object.keys(pairsObject).map(key => {return {blogs: pairsObject[key], author: key}});
    return authorBlogPairs.reduce((pre,cur)=> 
        cur.blogs > pre.blogs  ? cur: pre,
        {author:``,blogs:0});
}

const mostLikes  = (blogs) =>{
    const pairsObject =  blogs.reduce((pre,cur)=> {
        pre[cur.author]= pre[cur.author]? pre[cur.author]+cur.likes : cur.likes
        return pre
},{});
    let  authorLikePairs = Object.keys(pairsObject).map(key => {return {likes: pairsObject[key], author: key}});
    return authorLikePairs.reduce((pre,cur)=> 
        cur.likes > pre.likes  ? cur: pre,
        {author:``,likes:0});
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}