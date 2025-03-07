import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import axios from "axios";

const ChessGame: React.FC = () => {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState(game.fen()); // Board state

    console.log(game);

    const makeMove = async (source: string, target: string) => {
        const move = game.move({ from: source, to: target, promotion: "q" });
    
        if (!move) return false; // Invalid move, return false
    
        setFen(game.fen()); // Update board
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/move", { fen: game.fen() });
            const botMove = response.data.bot_move;
    
            if (botMove) {
                game.move(botMove);
                setFen(game.fen());
            }
        } catch (error) {
            console.error("Error fetching bot move:", error);
        }
    
        return true; // Return true to indicate success
    };
    
    return (
        <Chessboard
            position={fen}
            onPieceDrop={(source, target) => {
                makeMove(source, target); // Call function
                return true; // Ensure synchronous boolean return
            }}
        />
    );
    
};

export default ChessGame;
