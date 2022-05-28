# Score Board

Hi, this is just a TDD exercise.

## Deep Copy

I have created a `deepCopy` function to get around JavaScript's references and mutability.  
This issue would not be present in a real store/db implementation.

I wanted to make the `MemoryScoreProvider` a symmetric implementation to a future `MongoScoreProvider` or a `PostgresScoreProvider`.
So I had to get rid of the possibility that someone using the store could rely on mutating the data in the store via reference.

The `deepCopy` function is extremely poorly performing - but this is just an exercise an normally this function would not be necessary, or at least used from an existing package.

## remarks

I was wondering if I should check if the score decreases in the `ScoreBoard` service when updating.
Football game rules don't allow normally to decrease a score.
But single responsibility principle states that `ScoreBoard` should only have one responsibility - and right now it is "tracking scores".
It doesn't have to know the game rules - this way it is more reusable (e.g. for other games).

And I can think of some use-cases when someone would want to decrease the score - e.g. a mistake, or a goal gets invalidated by the referee.
