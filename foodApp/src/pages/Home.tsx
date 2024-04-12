import '../css/Home.css';

const Homepage = () => {
    return (
        <div className='home-style'>
            <div className='food-item'>
                <img src='https://cdn-rdb.arla.com/Files/arla-se/922471456/52aec50d-d09f-4068-be39-73fe77b20523.jpg?mode=crop&w=1680&h=750&scale=both&ak=f525e733&hm=e6b63260' alt='Shrimp salad' />
                <h3>Shrimp salad</h3>
                <p>Shrimp with egg and different kinds of salad</p>
                <p>Price: 89 kr</p>
            </div>
            <div className='food-item'>
                <img src='https://img-s1.onedio.com/id-55c8ad4d9f9b42eb271e736b/rev-0/w-1200/h-669/f-jpg/s-cea48205e2b0ca3ebb2a2cec158b8c2ca29d1229.jpg' alt='Adana Kebab' />
                <h3>Adana Kebab</h3>
                <p>Grilled minced meat with bread, bulgur, grilled peppers, grilled tomato and salad</p>
                <p>Price: 119 kr</p>
            </div>
            <div className='food-item'>
                <img src='https://th.bing.com/th/id/OIP.DMUuFtUpJRfQOKrgzOSdqQHaFn?rs=1&pid=ImgDetMain' alt='Meatballs with mashed potatoes' />
                <h3>Meatballs with mashed potatoes</h3>
                <p>Swedish meatballs with mashed potatoes, jam, cucumber and tasty sauce</p>
                <p>Price: 89 kr</p>
            </div>
            <div className='food-item'>
                <img src='https://www.barnfamilj.se/matgrafik/2008/08-01-11_pinklax_02.jpg' alt='Salmon with potatoes' />
                <h3>Salmon with potatoes</h3>
                <p>Salmon with boiled potatoes and creamy sauce</p>
                <p>Price: 99 kr</p>
            </div>
        </div>
    );
}

export default Homepage;
