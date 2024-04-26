CREATE TABLE public.recipes
(
    id uuid,
    author_id uuid,
    title text,
    description text,
    PRIMARY KEY (id),
    CONSTRAINT "FK_recipes_author_id" FOREIGN KEY (author_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
    created_at date NOT NULL,
    updated_at date,
);
