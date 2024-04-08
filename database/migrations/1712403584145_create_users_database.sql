CREATE TABLE users
(
    id uuid NOT NULL,
    name character varying(60) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(60) NOT NULL,
    created_at date NOT NULL,
    updated_at date,
    CONSTRAINT users_primary_key PRIMARY KEY (id),
    CONSTRAINT users_email_unique UNIQUE (email)
);