DELIMITER / / CREATE TRIGGER after_match_insert
AFTER
INSERT
    ON `match` FOR EACH ROW BEGIN -- Update win rate for team1
    CALL update_team_win_rate(NEW.idTeam1);

-- Update win rate for team2
CALL update_team_win_rate(NEW.idTeam2);

END DELIMITER / /