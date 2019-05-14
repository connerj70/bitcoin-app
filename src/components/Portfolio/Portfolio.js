import React, { Component } from "react";
import "./Portfolio.css";
import Header from "./components/Header/Header";
import SubHeader from "./components/SubHeader/SubHeader";

class Portfolio extends Component {
    render() {
        let x = '<blockquote className="instagram-media" data-instgrm-captioneddata-instgrm-permalink="https://www.instagram.com/p/BgG-oyynvSM/"data-instgrm-version="8"><div style={{padding:"8px"}}><div style={{background:"#F8F8F8", lineHeight:"0", marginTop:"40px", padding:"62.5% 0", textAlign:"center", width:"100%"}}><div  /></div><p > <ahref="https://www.instagram.com/p/BgG-oyynvSM/"target="_blank">Follow us 👉@viralglobe!👈 🙌🙏 Super Mario inreal life 🙄 📹Cr @brodiepawson @dylanpawson ~~~Tag your friends below!👇©ViralGlobe ⚠No©Copyright Infringement IntendedEmail(contact) us to fix/removal</a></p><p >A post shared by<ahref="https://www.instagram.com/viralglobe/"target="_blank">VIRALGLOBE</a>(@viralglobe) on<timedatetime="2018-03-09T16:25:33+00:00">Mar 9, 2018 at 8:25am PST</time></p></div></blockquote>'
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = x;
        let obj = window.$(".portfolio-wrapper")
        console.log(obj);
      console.log(htmlObject);
        return (
            <div className="portfolio-wrapper">
                <Header />
                <SubHeader />
                <div dangerouslySetInnerHTML={{__html: x}}></div>
                <div>
                   {htmlObject.HTMLDivElement}
                    </div>
                       </div>
        );
    }
}

export default Portfolio;

