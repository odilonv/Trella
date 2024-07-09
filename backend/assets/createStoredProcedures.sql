DELIMITER / / CREATE PROCEDURE update_team_win_rate(IN team_id INT) BEGIN DECLARE total_matches INT;

DECLARE total_wins INT;

-- Calculate the number of matches played by the team in the last 50 matches
SET
    total_matches = (
        SELECT
            COUNT(*)
        FROM
            (
                SELECT
                    *
                FROM
                    `match`
                WHERE
                    idTeam1 = team_id
                    OR idTeam2 = team_id
                ORDER BY
                    beginAt DESC
                LIMIT
                    50
            ) AS recent_matches
    );

-- Calculate the number of wins for the team in the last 50 matches
SET
    total_wins = (
        SELECT
            COUNT(*)
        FROM
            (
                SELECT
                    *
                FROM
                    `match`
                WHERE
                    idTeam1 = team_id
                    OR idTeam2 = team_id
                ORDER BY
                    beginAt DESC
                LIMIT
                    50
            ) AS recent_matches
        WHERE
            (
                idTeam1 = team_id
                AND score1 > score2
            )
            OR (
                idTeam2 = team_id
                AND score2 > score1
            )
    );

-- Update the win rate in the team table
UPDATE
    `team`
SET
    winRate = (total_wins / total_matches) * 100
WHERE
    id = team_id;

END DELIMITER / /