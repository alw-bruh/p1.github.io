function show() {
      const popup = document.getElementById('yesbtn');
    popup.classList.add('show');
    popup.style.top = `${y - players.sizes.height - 34}px`;
    popup.style.left = "50%";
    }
    function close() {
        document.getElementById('yesbtn').classList.remove('show');
    }
