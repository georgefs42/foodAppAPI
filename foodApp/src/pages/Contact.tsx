import '../App.css'
import '../css/Contact.css'


const ContactPage=()=>{
    return(

        <div className="contact-container">
            <h2 className="contact-heading">Contact Us</h2>
            <div className="contact-info">
                <p><strong>Opening Hours:</strong> Monday - Friday: 9am - 5pm</p>
                <p><strong>Email:</strong> info@grupp-arbete-6.se</p>
                <p><strong>Phone:</strong> +46 70 123 45 67</p>
            </div>
            <img src="https://st2.depositphotos.com/1518767/10326/i/450/depositphotos_103266334-stock-photo-restaurant-team-standing-together.jpg" alt="Ourteam" />
   
          
            <p className="copyright">© Food and Cocktails 2024</p>
        </div>
    );
}

export default ContactPage;

