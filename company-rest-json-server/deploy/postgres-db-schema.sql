--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.2
-- Dumped by pg_dump version 9.4.0
-- Started on 2016-02-21 00:56:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 9 (class 2615 OID 16933)
-- Name: full_stack; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA full_stack;


SET search_path = full_stack, pg_catalog;

--
-- TOC entry 215 (class 1259 OID 16934)
-- Name: seq_company_id; Type: SEQUENCE; Schema: full_stack; Owner: -
--

CREATE SEQUENCE seq_company_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 216 (class 1259 OID 16936)
-- Name: company; Type: TABLE; Schema: full_stack; Owner: -; Tablespace: 
--

CREATE TABLE company (
    com_id bigint DEFAULT nextval('seq_company_id'::regclass) NOT NULL,
    com_name character varying(512),
    com_address character varying(512),
    com_city character varying(255),
    com_country character varying(100),
    com_email character varying(100),
    com_phone character varying(20)
);


--
-- TOC entry 217 (class 1259 OID 16943)
-- Name: seq_owcom_id; Type: SEQUENCE; Schema: full_stack; Owner: -
--

CREATE SEQUENCE seq_owcom_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 218 (class 1259 OID 16945)
-- Name: owcom; Type: TABLE; Schema: full_stack; Owner: -; Tablespace: 
--

CREATE TABLE owcom (
    owcom_id bigint DEFAULT nextval('seq_owcom_id'::regclass) NOT NULL,
    owcom_com_id bigint,
    owcom_owner_id bigint
);


--
-- TOC entry 219 (class 1259 OID 16949)
-- Name: seq_owner_id; Type: SEQUENCE; Schema: full_stack; Owner: -
--

CREATE SEQUENCE seq_owner_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 220 (class 1259 OID 16951)
-- Name: owner; Type: TABLE; Schema: full_stack; Owner: -; Tablespace: 
--

CREATE TABLE owner (
    owner_id bigint DEFAULT nextval('seq_owner_id'::regclass) NOT NULL,
    owner_name character varying(100)
);


--
-- TOC entry 1989 (class 2606 OID 16956)
-- Name: con_company_id_pk; Type: CONSTRAINT; Schema: full_stack; Owner: -; Tablespace: 
--

ALTER TABLE ONLY company
    ADD CONSTRAINT con_company_id_pk PRIMARY KEY (com_id);


--
-- TOC entry 1991 (class 2606 OID 16958)
-- Name: con_owcom_id_pk; Type: CONSTRAINT; Schema: full_stack; Owner: -; Tablespace: 
--

ALTER TABLE ONLY owcom
    ADD CONSTRAINT con_owcom_id_pk PRIMARY KEY (owcom_id);


--
-- TOC entry 1995 (class 2606 OID 16960)
-- Name: con_owner_id_pk; Type: CONSTRAINT; Schema: full_stack; Owner: -; Tablespace: 
--

ALTER TABLE ONLY owner
    ADD CONSTRAINT con_owner_id_pk PRIMARY KEY (owner_id);


--
-- TOC entry 1992 (class 1259 OID 16961)
-- Name: fki_con_cbowner_com_id_fk; Type: INDEX; Schema: full_stack; Owner: -; Tablespace: 
--

CREATE INDEX fki_con_cbowner_com_id_fk ON owcom USING btree (owcom_com_id);


--
-- TOC entry 1993 (class 1259 OID 16962)
-- Name: fki_con_cbowner_owner_id_fk; Type: INDEX; Schema: full_stack; Owner: -; Tablespace: 
--

CREATE INDEX fki_con_cbowner_owner_id_fk ON owcom USING btree (owcom_owner_id);


--
-- TOC entry 1996 (class 2606 OID 16963)
-- Name: con_owcom_com_id_fk; Type: FK CONSTRAINT; Schema: full_stack; Owner: -
--

ALTER TABLE ONLY owcom
    ADD CONSTRAINT con_owcom_com_id_fk FOREIGN KEY (owcom_com_id) REFERENCES company(com_id);


--
-- TOC entry 1997 (class 2606 OID 16968)
-- Name: con_owcom_owner_id_fk; Type: FK CONSTRAINT; Schema: full_stack; Owner: -
--

ALTER TABLE ONLY owcom
    ADD CONSTRAINT con_owcom_owner_id_fk FOREIGN KEY (owcom_owner_id) REFERENCES owner(owner_id);


-- Completed on 2016-02-21 00:56:23

--
-- PostgreSQL database dump complete
--

