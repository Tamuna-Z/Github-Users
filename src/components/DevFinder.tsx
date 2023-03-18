import './DevFinder.css';
import {useState,useEffect} from 'react';

function DevFinder(){
    const apiURL= 'https://api.github.com/users/'
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const [searchedWord, setSearchedWord] = useState<string>('octocat');
    const[avatar,setAvatar]=useState();
    const [acountCheck,setAcountCheck]=useState<boolean>(false);
    const [name,setName]=useState<string|null>(null);
    const[joined,setJoined]=useState<string>('');
    const [bio,setBio]=useState<string | null>(null);
    const [repos, setRepos]=useState<string | null>(null);
    const [followers,setFollowers]=useState<string | null>(null);
    const[following, setFollowing]=useState<string | null>(null);
    const[location, setLocation]=useState<string | null>(null);
    const[twitter,setTwitter]=useState<string | null>(null);
    const [blog, setBlog]=useState<string | null>('');
    const [company, setCompany]=useState<string | null>(null);
    const[darkModeB, setDarkModeB]=useState<boolean>(true);

    useEffect(()=>{
        fetch(apiURL + searchedWord)
        .then((response) => response.json()
        .then((data)=>{
            setAvatar(data.avatar_url)
            setName(data.login)
            setJoined(data.created_at)
            setBio(data.bio)
            setRepos(data.public_repos)
            setFollowers(data.followers)
            setFollowing(data.following)
            setLocation(data.location)
            setTwitter(data.twitter_username)
            setBlog(data.blog)
            setCompany(data.company)
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