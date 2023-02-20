CREATE TABLE blogs(
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT '0'
);

insert into blogs (author, url, title, likes) values ('Barack Obama', 'http://notexistingurl.com/bo1','Killing For a Nobel Peace Prize',2);
insert into blogs (author, url, title) values ('Vladimir Putin', 'http://notexistingurl.com/vp1','Why does no one like me');