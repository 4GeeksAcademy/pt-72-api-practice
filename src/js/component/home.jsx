import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [userInput, setUserInput] = useState("");
	const [userList, setUserList] = useState([]);
	const [starships, setStarships] = useState([])
	const [user, setUser] = useState()

	useEffect(() => {
		async function getStarships() {
			let response = await fetch("https://www.swapi.tech/api/starships")
			let data = await response.json()
			setStarships(data.results)
		}
		getStarships()
	}, []);

	useEffect(() => {
		async function checkForuser() {
			let response = await fetch("https://playground.4geeks.com/todo/users/thisUserName")
			let data = await response.json()
			if(data.detail !== "User thisUserName doesn't exist.") {
				setUser(data);
			}
			else {
				let response = await fetch("https://playground.4geeks.com/todo/users/thisUserName", {
					method: "POST",
					headers: { "Content-type": "application/json" },
				})
				let data = await response.json()
				console.log(data)
			}
		}
	}, [])

	const addToList = () => {
		setUserList([...userList, userInput]);
		// let newArray = userList.push(userInput);
		// setUserList(newArray);
		setUserInput("")
	};
	const deleteFromList = (deleted) => {
		const updatedArray = userList.filter((item, index) => {
			return item !== deleted
		})
		setUserList(updatedArray)
	};

	return (
		<div className="text-center">
			<input value={userInput} onChange={(ev) => setUserInput(ev.target.value)}/>
			<button onClick={() => addToList()}>Display Input</button>

			<ol>
				{userList?.map((item, index) => (
					<li key={index}>{item}<span onClick={() => deleteFromList(item)}> Delete</span></li>
				))}
			</ol>

			<ol>
				{starships?.map((ship, index) => (
					<li key={index}>{ship.name}<span onClick={() => deleteFromList(item)}> Delete</span></li>
				))}
			</ol>
		</div>
	);
};

export default Home;
