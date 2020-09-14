const profilePhoto = document.querySelector('.profile-photo');

const profileName = document.querySelector('.profile-name');
const profileBio = document.querySelector('.profile-bio');
const profileAddress = document.querySelector('.profile-address');
const profilePhone = document.querySelector('.profile-phone');

const likeList = document.querySelector('.like-list');
const dislikeList = document.querySelector('.dislike-list');

profilePhoto.addEventListener('click', event => {
  console.log(event);
})

const fetchData = async () => {
  const res = await fetch('https://indapi.kumba.io/webdev/assignment');
  res.json().then(data => {
    // console.log(data);

    const user = data.user;
    renderProfile(user);
  })
}

const renderProfile = (user) => {
  // console.log(user);
  profileName.textContent = user.name;
  profileBio.textContent = user.about;
  profileAddress.textContent = user.address;
  profilePhone.textContent = user.phone;

  const likes = user.likes;
  likes.forEach(item => {
    // console.log(item);
    const li = document.createElement('li');
    li.textContent = item;
    likeList.appendChild(li);
  })

  const dislikes = user.dislikes;
  dislikes.forEach(item => {
    // console.log(item);
    const li = document.createElement('li');
    li.textContent = item;
    dislikeList.appendChild(li);
  })
}

fetchData();