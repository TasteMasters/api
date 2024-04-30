CREATE TABLE public.tags
(
    id uuid NOT NULL,
    name text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.recipes_tags
(
    id uuid NOT NULL,
    recipe_id uuid NOT NULL,
    tag_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    CONSTRAINT "FK_recipe_tags_recipe_id" FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT "FK_recipe_tags_tag_id" FOREIGN KEY (tag_id)
        REFERENCES public.tags (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);