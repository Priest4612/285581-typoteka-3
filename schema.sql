--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 12.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS typoteka_3;
--
-- Name: typoteka_3; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE typoteka_3 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';


\connect typoteka_3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: article_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_categories (
    id bigint NOT NULL,
    id_article bigint,
    id_category bigint
);


--
-- Name: article_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.article_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: article_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.article_categories_id_seq OWNED BY public.article_categories.id;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles (
    id_article bigint NOT NULL,
    title character varying(256) NOT NULL,
    create_date date NOT NULL,
    announce character varying(512),
    full_text text,
    id_picture bigint,
    id_user bigint
);


--
-- Name: articles_id_article_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_id_article_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: articles_id_article_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_id_article_seq OWNED BY public.articles.id_article;


--
-- Name: categoty_list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categoty_list (
    id_category bigint NOT NULL,
    category_name character varying(128) NOT NULL,
    comment text
);


--
-- Name: categoty_list_id_category_name_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categoty_list_id_category_name_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categoty_list_id_category_name_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categoty_list_id_category_name_seq OWNED BY public.categoty_list.id_category;


--
-- Name: client_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_groups (
    id_group bigint NOT NULL,
    name_group character varying(128) NOT NULL,
    comment text
);


--
-- Name: TABLE client_groups; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.client_groups IS 'Категории пользователей (p.s. необходимость данной таблицы пока что не очень ясна).';


--
-- Name: client_groups_id_group_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.client_groups_id_group_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: client_groups_id_group_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.client_groups_id_group_seq OWNED BY public.client_groups.id_group;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id_comment bigint NOT NULL,
    id_user bigint NOT NULL,
    id_article bigint NOT NULL,
    create_date date NOT NULL,
    text text NOT NULL
);


--
-- Name: comments_id_comment_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_comment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_comment_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_comment_seq OWNED BY public.comments.id_comment;


--
-- Name: pictures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pictures (
    id_picture bigint NOT NULL,
    picture_name character varying(128) NOT NULL,
    picture_path character varying(256) NOT NULL,
    comment text
);


--
-- Name: puctures_id_picture_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.puctures_id_picture_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: puctures_id_picture_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.puctures_id_picture_seq OWNED BY public.pictures.id_picture;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id_user bigint NOT NULL,
    password character varying(128) NOT NULL,
    firstname character varying(128) NOT NULL,
    lastname character varying(128) NOT NULL,
    email character varying(128) NOT NULL,
    id_picture bigint NOT NULL,
    id_client_group bigint NOT NULL
);


--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- Name: article_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_categories ALTER COLUMN id SET DEFAULT nextval('public.article_categories_id_seq'::regclass);


--
-- Name: articles id_article; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles ALTER COLUMN id_article SET DEFAULT nextval('public.articles_id_article_seq'::regclass);


--
-- Name: categoty_list id_category; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categoty_list ALTER COLUMN id_category SET DEFAULT nextval('public.categoty_list_id_category_name_seq'::regclass);


--
-- Name: client_groups id_group; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_groups ALTER COLUMN id_group SET DEFAULT nextval('public.client_groups_id_group_seq'::regclass);


--
-- Name: comments id_comment; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id_comment SET DEFAULT nextval('public.comments_id_comment_seq'::regclass);


--
-- Name: pictures id_picture; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures ALTER COLUMN id_picture SET DEFAULT nextval('public.puctures_id_picture_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- Name: article_categories article_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_categories
    ADD CONSTRAINT article_categories_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id_article);


--
-- Name: categoty_list categoty_list_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categoty_list
    ADD CONSTRAINT categoty_list_pkey PRIMARY KEY (id_category);


--
-- Name: client_groups client_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_groups
    ADD CONSTRAINT client_groups_pkey PRIMARY KEY (id_group);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id_comment);


--
-- Name: pictures puctures_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT puctures_pkey PRIMARY KEY (id_picture);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: articles articles__pictures; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles__pictures FOREIGN KEY (id_picture) REFERENCES public.pictures(id_picture);


--
-- Name: articles articles__users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles__users FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- Name: comments comments__articles; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments__articles FOREIGN KEY (id_article) REFERENCES public.articles(id_article);


--
-- Name: comments comments__users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments__users FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- Name: users user__client_group; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user__client_group FOREIGN KEY (id_client_group) REFERENCES public.client_groups(id_group);


--
-- Name: users user__pictures; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user__pictures FOREIGN KEY (id_picture) REFERENCES public.pictures(id_picture) NOT VALID;


--
-- PostgreSQL database dump complete
--

