CREATE TABLE public.recipe_ingredients
(
    id uuid NOT NULL,
    recipe_id uuid NOT NULL,
    name text NOT NULL,
    amount text NOT NULL,
    image text,
    created_at date NOT NULL,
    updated_at date,
    PRIMARY KEY (id),
    CONSTRAINT "FK_recipe_ingredients_recipe_id" FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);