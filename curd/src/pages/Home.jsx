import { useState ,useEffect} from "react";


export default function Home(){

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword]=useState("");

    const [ Admin,setAdmin]=useState([]);

    const handleSubmit =(e)=>{
        e.preventDefault()
        fetch("http://localhost:8000/Admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Name, Email, Password }),
        })
        .then((data)=>{
            console.log(data)
            alert("data added successfully")
            setName("")
            setEmail("")
            setPassword("")

        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetch("http://localhost:8000/Admin")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setAdmin(data)
            })
    }, [])


    return(
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={Name} onChange={(e)=>{setName(e.target.value)}} placeholder="enter  your name"/><br/><br/>
                <input type="text" value={Email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="enter  your email"/><br/><br/>
                <input type="text" value={Password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="enter  your password"/><br/><br/>
                <button type="submit" >Submit</button>
            </form>
        </div>

        <div>
            {
                Admin.map((v,i)=>{
                    return(
                        <div className="curd"  key={v.id}>
                            <h2>{v.Name}</h2>
                            <h2>{v.Email}</h2>
                            <h2>{v.Password}</h2>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}