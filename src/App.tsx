import './App.scss';
import { useEffect, useState } from 'react';
import Loading from './Loading';

interface keyable {
  [results: string]: any  
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [cell, setCell] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<number>(0);


  const typeLetter = (letter: string, seconds: number) => {
    setTimeout(()=>{
      document.getElementById('headerText')!.insertAdjacentHTML("beforeend", letter);
    }, seconds)
  }

  useEffect(()=>{
    let text: string = "Welcome to Random User Generator."
    let arr: string[] = Array.from(text);
    let seconds: number = 200;

    for(let i=0; i<arr.length; i++){
      typeLetter(arr[i], seconds);
      seconds = seconds + 200;
    }
  }, [])

  const generate = () => {
    let button = document.getElementById('generateButton')!;
    button.style.top="150px";
    setLoading(true);
    fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => {
       setLoading(false);
       setGender(data.results[0].gender);
       setFullName(data.results[0].name.title + " " + data.results[0].name.first + " " + data.results[0].name.last);
       setLocation(data.results[0].location.street.number + " " + data.results[0].location.street.name + " " + data.results[0].location.state + " " + data.results[0].location.city + " " + data.results[0].location.postcode);
       setCell(data.results[0].phone);
       setAge(data.results[0].dob.age);
       setEmail(data.results[0].email);
     }).catch((error) => {
      console.log('error ' + error);
   });
   setTimeout(()=>{
    document.getElementById('userInfo')!.style.visibility="visible";
   }, 300)
  }

  return (
    <div className="App">
      <div style={{width: '52.5%', position: "relative", left: "350px", top: "20px"}} className="typewriter">
      <h1 id="headerText" style={{color: "white"}}></h1>
      </div>
      { loading === false ? <button onClick={generate} id="generateButton" className="generateButton">Generate</button> : <button style={{pointerEvents: "none", opacity: "50%"}} id="generateButton" className="generateButton">Generate</button>}
      {loading && <Loading />}
      { loading === false && <div className="userInfo" id="userInfo">
        <h3>{fullName}</h3>
        <h3>Gender: {gender}</h3>
        <h3>Age: {age}</h3>
        <h3>Location: {location}</h3>
        <h3>Phone Number: {cell}</h3>
        <h3>Email: {email}</h3>
      </div>}
    </div>
  );
}

export default App;
