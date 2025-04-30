// 뒤로가기
function goBack() {
    history.back();
  }
  
  // 리뷰 수정
  function submitReview() {
    alert('수정');
  }
  
  // 삭제 팝업 열기
  function showDeletePopup() {
    document.getElementById('delete-popup').style.display = 'block';
  }
  
  // 삭제 팝업 닫기
  function cancelDelete() {
    document.getElementById('delete-popup').style.display = 'none';
  }
  
  // 삭제 확정
  function confirmDelete() {
    alert('삭제');
    document.getElementById('delete-popup').style.display = 'none';
  }
  
  // 🖼️ 사진 업로드해서 화면에 표시하기
  const photoInput = document.getElementById('photo-input');
  const currentPhoto = document.getElementById('current-photo');
  
  photoInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        currentPhoto.src = e.target.result; // 업로드한 사진을 img src로 변경
      };
      reader.readAsDataURL(file);
    }
  });

const stars = document.querySelectorAll('.star');

stars.forEach((star) => {
  star.addEventListener('click', function() {
    const rating = this.getAttribute('data-index');
    updateStars(rating);
  });
});

function updateStars(rating) {
  stars.forEach((star) => {
    if (star.getAttribute('data-index') <= rating) {
      star.textContent = '★';
    } else {
      star.textContent = '☆';
    }
  });
}

  