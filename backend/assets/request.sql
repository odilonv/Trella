SELECT COUNT(*) as won
FROM (SELECT *
      FROM `match`
      WHERE idTeam1 = x
         OR idTeam2 = x
      ORDER BY beginAt DESC LIMIT
            50) AS recent_matches
WHERE (
            idTeam1 = x
        AND score1 > score2
    )
   OR (
            idTeam2 = x
        AND score2 > score1
    );

SELECT COUNT(*) as losed
FROM (SELECT *
      FROM `match`
      WHERE idTeam1 = x
         OR idTeam2 = x
      ORDER BY beginAt DESC LIMIT
            50) AS recent_matches
WHERE (
            idTeam1 = x
        AND score1 < score2
    )
   OR (
            idTeam2 = x
        AND score2 < score1
    );