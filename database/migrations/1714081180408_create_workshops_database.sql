CREATE TABLE workshops (
    id UUID PRIMARY KEY,
    title TEXT,
    description TEXT,
    category TEXT,
    difficulty TEXT,
    image TEXT,
    start_date DATE,
    creator_id UUID REFERENCES users(id),
    ingredients TEXT[],
    created_at DATE, 
    updated_at DATE 
);