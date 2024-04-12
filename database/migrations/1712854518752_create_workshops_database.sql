CREATE TABLE workshops
(
    id uuid NOT NULL,
    title character varying(150) NOT NULL,
    description text NOT NULL,
    instructor uuid NOT NULL references users(id),
    created_at date NOT NULL,
    updated_at date,
    start_event timestamp with time zone NOT NULL,
    duration interval NOT NULL,
    capacity integer,
    cost numeric(10,2) NOT NULL,
    category character varying(100) NOT NULL,
    difficulty character varying(50) NOT NULL,
    CONSTRAINT workshops_primary_key PRIMARY KEY (id)
);
