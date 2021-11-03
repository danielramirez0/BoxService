# Video Games Database Information

## ERD

![ERD](./video_games_ERD.png)

### Table Explanations


### Genre

This table has a short list of game genres, such as Strategy or Racing. It’s helpful if you want to see what genre a game is, or the types of genres that are making sales.

### Game

A list of all of the games in the database. It only contains a title, and a genre_id to link to the genre table. There is no concept of a series in this data (e.g. “Call of Duty” or “Need for Speed”).

### Publisher

A company that publishes video games.

### Game_Publisher

This is a joining table that defines the games and their publishers, because in the source data, a game can have many publishers. One example is different publishers work with the game on different platforms (e.g. one on PC and one on XBOX).

### Platform

A list of the different gaming platforms in the source data. For example, PC, Playstation 3, XBOX360, Nintendo.

### Game_Platform

This table links the games, publishers, and the platform. Using this table, you can see the games, who published them, and on which platform (when you join to the related tables).

It also includes the release_year. Why is the release_year here and not on the game table?

This is because, in the source data, a game can be released by different publishers on a different platform in a different year. For example, SimCity 2000 was released on PC in 1992 and PS in 1996.

### Region

This lists 4 different regions that sales were captured in: North America, Europe, Japan, and Others.

### Region_Sales

This table shows all sales made for games in each region. It’s the main table used to calculate the sales for queries.

The num_sales column is the number of sales of the game in the region, and the **number is in millions**.

### Design Comments

There were a few considerations and limitations in the source data that resulted in this database design:

- The release year applies to a combination of game, platform, and publisher, not just for a game as I assumed
- The sales are captured overall as at a point in time and are not broken down by years
- A game can have different publishers for different platforms
- The data includes games released in 2016 and a couple of games released in 2017
