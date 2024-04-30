ALTER TABLE public.recipes
    ALTER COLUMN created_at TYPE timestamp with time zone ;

ALTER TABLE public.recipes
    ALTER COLUMN updated_at TYPE timestamp with time zone ;

ALTER TABLE public.recipe_ingredients
    ALTER COLUMN created_at TYPE timestamp with time zone ;

ALTER TABLE public.recipe_ingredients
    ALTER COLUMN updated_at TYPE timestamp with time zone ;

ALTER TABLE public.users
    ALTER COLUMN created_at TYPE timestamp with time zone ;

ALTER TABLE public.users
    ALTER COLUMN updated_at TYPE timestamp with time zone ;

ALTER TABLE public.workshops
    ALTER COLUMN created_at TYPE timestamp with time zone ;

ALTER TABLE public.workshops
    ALTER COLUMN updated_at TYPE timestamp with time zone ;