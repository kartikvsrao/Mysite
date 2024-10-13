import React, { useState } from "react";
import Navbar from '../GeneralComponents/Navbar';
import '../../styles/PokerPage.css'; // For styling

const PokerPage = () => {
  const [sessions, setSessions] = useState([]);
  const [buyIn, setBuyIn] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [place, setPlace] = useState("");
  const [gameType, setGameType] = useState("Cash");
  const [stakes, setStakes] = useState("");
  const [totalBankroll, setTotalBankroll] = useState(0);

  // Filtering States
  const [filterGameType, setFilterGameType] = useState("All");
  const [filterPlace, setFilterPlace] = useState("");
  const [filterStakes, setFilterStakes] = useState("");
  const [filterProfitLoss, setFilterProfitLoss] = useState("All");

  const addSession = (e) => {
    e.preventDefault();
    const profitLoss = finalAmount - buyIn;

    const newSession = {
      id: Date.now(),
      buyIn: parseFloat(buyIn),
      finalAmount: parseFloat(finalAmount),
      profitLoss,
      place,
      gameType,
      stakes,
    };

    setSessions([...sessions, newSession]);
    setTotalBankroll(totalBankroll + profitLoss); // Update bankroll
    resetForm();
  };

  const resetForm = () => {
    setBuyIn("");
    setFinalAmount("");
    setPlace("");
    setGameType("Cash");
    setStakes("");
  };

  // Filtering Logic
  const filteredSessions = sessions.filter((session) => {
    const profitLossStatus =
      filterProfitLoss === "Profit" ? session.profitLoss > 0 :
      filterProfitLoss === "Loss" ? session.profitLoss < 0 :
      filterProfitLoss === "Breakeven" ? session.profitLoss === 0 : true;

    const gameTypeMatch = filterGameType === "All" || session.gameType === filterGameType;
    const placeMatch = filterPlace === "" || session.place.toLowerCase().includes(filterPlace.toLowerCase());
    const stakesMatch = filterStakes === "" || session.stakes.toLowerCase().includes(filterStakes.toLowerCase());

    return profitLossStatus && gameTypeMatch && placeMatch && stakesMatch;
  });

  return (
    <div>
      <Navbar />
      <div className="poker-page">
        <h1>Poker Session Tracker</h1>
        <h2>Total Bankroll: ${totalBankroll.toFixed(2)}</h2>

        {/* Filter Section */}
        <div className="filter-section">
          <select value={filterGameType} onChange={(e) => setFilterGameType(e.target.value)}>
            <option value="All">All Game Types</option>
            <option value="Cash">Cash Game</option>
            <option value="Tournament">Tournament</option>
          </select>
          <input
            type="text"
            value={filterPlace}
            onChange={(e) => setFilterPlace(e.target.value)}
            placeholder="Filter by Place"
          />
          <input
            type="text"
            value={filterStakes}
            onChange={(e) => setFilterStakes(e.target.value)}
            placeholder="Filter by Stakes"
          />
          <select value={filterProfitLoss} onChange={(e) => setFilterProfitLoss(e.target.value)}>
            <option value="All">All Profit/Loss</option>
            <option value="Profit">Profit</option>
            <option value="Loss">Loss</option>
            <option value="Breakeven">Breakeven</option>
          </select>
        </div>

        <form onSubmit={addSession} className="session-form">
          <input
            type="number"
            value={buyIn}
            onChange={(e) => setBuyIn(e.target.value)}
            placeholder="Buy-in Amount"
            required
          />
          <input
            type="number"
            value={finalAmount}
            onChange={(e) => setFinalAmount(e.target.value)}
            placeholder="Final Amount"
            required
          />
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Place Played"
            required
          />
          <select
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
          >
            <option value="Cash">Cash Game</option>
            <option value="Tournament">Tournament</option>
          </select>
          <input
            type="text"
            value={stakes}
            onChange={(e) => setStakes(e.target.value)}
            placeholder="Stakes"
            required
          />
          <button type="submit">Add Session</button>
        </form>

        <h3>Sessions</h3>
        <ul className="session-list">
          {filteredSessions.map((session) => (
            <li key={session.id}>
              <span>Buy-in: ${session.buyIn.toFixed(2)}</span>
              <span>Final Amount: ${session.finalAmount.toFixed(2)}</span>
              <span>Profit/Loss: ${session.profitLoss.toFixed(2)}</span>
              <span>Place: {session.place}</span>
              <span>Type: {session.gameType}</span>
              <span>Stakes: {session.stakes}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokerPage;
