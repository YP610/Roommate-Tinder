function toggleFollow() {
    const followButton = document.querySelector('.follow-button');
   
    if (followButton.innerText === 'Edit') {
      followButton.innerText = 'Edit';
      followButton.style.backgroundColor = '#28a745';
    } else {
      followButton.innerText = 'Edit';
      followButton.style.backgroundColor = '#007bff';
    }
  }
 