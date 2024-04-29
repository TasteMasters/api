CREATE TABLE public.recipe_images
(
    id uuid NOT NULL,
    recipe_id uuid NOT NULL,
    image text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at text,
    PRIMARY KEY (id),
    CONSTRAINT "FK_recipe_images_recipe_id" FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);