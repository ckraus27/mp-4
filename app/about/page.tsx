import Link from "next/link";
export default function About() {
    return(
        <div style={{padding: "20px", backgroundColor: "lightgrey", minHeight: "100vh"}}>
            <h1 style = {{color: "darkblue"}}>About Us</h1>
            <p>
                This website uses a weather API to show the weather information in different cities
            </p>
            <Link href="/">Back to Home</Link>
        </div>
    )
}