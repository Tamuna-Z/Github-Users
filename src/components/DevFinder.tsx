import './DevFinder.css';
import {useState,useEffect} from 'react';

function DevFinder(){
    const apiURL= 'https://api.github.com/users/'
    const [searchedWord, setSearchedWord] = useState<string>('octocat');
    const[avatar,setAvatar]=useState();
    const [acountCheck,setAcountCheck]=useState<boolean>(false);

    useEffect(()=>{
        fetch(apiURL + searchedWord)
        .then((response) => response.json()
        .then((data)=>{
            setAvatar(data.avatar_url)
        })
        )
    },[])
    const searchCheck = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setSearchedWord(event.target.value)
    }

    function searching(){
        fetch(apiURL + searchedWord)
        .then((response) => response.json()
        .then((data)=>{
            if (data.message === "not found"){
                setAcountCheck(true)
            }else{
                setAcountCheck(false)
                setAvatar(data.avatar_url)
            }

        }))

    }
    return(
        <div>
            <input onChange={searchCheck}/>
           <button 
           onClick={searching}
           className="searchButton"
           >search</button>
           <div>
            <img src={avatar} className="avatar"/>
           </div>
        </div>
    )

}

export default DevFinder;