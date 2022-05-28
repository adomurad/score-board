# Score Board

Hi, this is just a TDD exercise.

## Deep Copy

I have created a `deepCopy` function to get around JavaScript's references and mutability.  
This issue would not be present in a real store/db implementation.

I wanted to make the `MemoryScoreProvider` a symmetric implementation to a future `MongoScoreProvider` or a `PostgresScoreProvider`.
So I had to get rid of the possibility that someone using the store could rely on mutating the data in the store via reference.

The `deepCopy` function is extremely poorly performing - but this is just an exercise an normally this function would not be necessary, or at least used from an existing package.
