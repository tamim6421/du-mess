import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'next/image';

const Footer = () => {
    return (
        <div style={{background: "#d7d8ff"}}>
            <Container>
                <div className="text-center">
                    <p className="m-0">© 2024 DU Mess. Developed By 
                        
                    <a href="http://ancovabd.com/">
                     <Image src="/ancovabr.png" alt="" className="img-fluid custom-image px-2"  width={120} height={100} />
                        
                        </a>
                    
                     </p>
                </div>
            </Container>
        </div>
    );
};

export default Footer;