export default (Vue) => {
  if (!Array.prototype.remove) {
    Array.prototype.remove = function (item) {
      if (!this.length) return;
      const index = this.indexOf(item);
      if (index > -1) {
        this.splice(index, 1);
        return this;
      }
    };
  }

  const init = {
    lazyLoad: false,
    default: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAnAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQzExOTQ5MzE1RDcxMUU3QUY4RThENjQwNzc1OTExOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQzExOTQ5NDE1RDcxMUU3QUY4RThENjQwNzc1OTExOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFDMTE5NDkxMTVENzExRTdBRjhFOEQ2NDA3NzU5MTE4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFDMTE5NDkyMTVENzExRTdBRjhFOEQ2NDA3NzU5MTE4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQADAkJCQkJDAkJDBIMCgwSFRAMDBAVGBQUFRQUGBcSFBQUFBIXFxwdHx0cFyUlKCglJTY1NTU2PDw8PDw8PDw8PAENDAwNDw0QDg4QFA4PDhQUEBEREBQdFBQWFBQdJhsXFxcXGyYhJB8fHyQhKSkmJikpNDQyNDQ8PDw8PDw8PDw8/8AAEQgAlgCWAwEiAAIRAQMRAf/EAHAAAQEBAQEBAQAAAAAAAAAAAAAEAwUCAQcBAQAAAAAAAAAAAAAAAAAAAAAQAQACAAIGCAQGAwEAAAAAAAABAgMEETFyMxQFIUFRkaGxElNxwRMVYYEiQlI0MmIjJBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8tatYm1piKxrmWXGZT3q94Nh4w8XCxdM4V4tEa9DxObytZmJxaxMa40g2GPGZT3q95xmU96veDYY8ZlPer3nGZT3q94NhjxmU96vecZlfer3g2Hytq3iLUn1Vnrh9AAAAAAAABFzLcVjqm3T3PODkMviYVL20xNqxM6nvme5pt/KW+W/r4WzAPGFksLAv68O1tPXHRokxslgY1vXaNFp16NHSoAR/bct228D7blu23gsAR/bct228D7blu23gsAR/bct228HnF5fl6YV7xM6axMxqXM8xuMXZkE3LN1eOqLdEfktRcs3V9qPJaAAAAAAAACPme5pt/KW+W/r4WzDDme5pt/KW+W/r4WzANUmYz+HgzNMOPqYnhDDN52bzOFgTopHRa8dfwRRER1Atw+Z4kWj61I9EzrjqdGtq3iLVnTE6pcFTk81OBb6d5/5W1f6yDrD5NqxX1TMRXXp6tCHF5non04FPVEfunV+QL2eY3GLsyyy2dpmJ9Ex6MT+M9fwa5jcYuzIJuV7q+1HktRcr3V9qPJaAAAAAAAACPme5pt/KU2NmZjL4WXw5/bHrn5KeZbmm38pcwD8OwAA/AAdDKziUwrUzMaMCY6LW6J+CHE+nGJMYU+qkap1KMtmaxHD5n9WFborM9XxeczlbYE6a9OHP+Mgn6eiYnRaNUunTM8Rk8WbbytZi0flrcx6pecObTH7qzW0dsSDocs3V9qPJai5ZusTajyWgAAAAAAAAj5luafhbp8XMd69K3rNbxprPUx4LK+34yDjjscFlvb8ZOCy3t+Mg447HBZb2/GTgst7fjIOXgzg+uIzEfono09nxVZyMelYilv8AzTqiseargsr7fjLSuFh1p9OI/R2T0+YOGOxwWV/h4ycFlfb8ZBly3dYk9tujuWPlKVpWK0jREdUPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z',
  };

  const listeners = [];
  const imageCache = [];

  const onListen = (ele, bind) => {
    if (bind) {
      ele.addEventListener('scroll', render);
    } else {
      init.lazyLoad = false;
      ele.removeEventListener('scroll', render);
    }
  };

  const render = (e) => {
    for (let i = 0; i < listeners.length; i++) {
      checkCanShow(listeners[i]);
    }
  };

  const setEleSrc = (ele, imgSrc) => {
    ele.src = imgSrc;
    ele.style.opacity = 1;
    // ele.nextElementSibling.style.display = 'block'
    ele.setAttribute('load', 'success');
  };

  const alreadyLoad = (ele, imgSrc) => {
    if (imageCache.indexOf(imgSrc) > -1) {
      setEleSrc(ele, imgSrc);
      return true;
    }
    return false;
  };

  const checkCanShow = (item) => {
    const ele = item.ele;
    const top = ele.getBoundingClientRect().top;
    if (top + 10 < window.innerHeight) {
      loadImgAsync(item, (ele, imgSrc) => {
        setEleSrc(ele, imgSrc);
        imageCache.push(imgSrc);
      }, (e) => {
        console.log('image load fail');
      });
      return true;
    }
    return false;
  };

  const loadImgAsync = (item, resolve, reject) => {
    const img = new Image();
    img.src = item.imgSrc;
    img.onload = () => {
      resolve(item.ele, item.imgSrc);
    };
    img.onerror = (e) => {
      reject(e);
    };
    listeners.remove(item);
  };

  const addListener = (ele, binding) => {
    const imgSrc = binding.value;
    // ele.nextElementSibling.style.display = 'none'
    ele.setAttribute('load', 'fail');
    if (alreadyLoad(ele, imgSrc)) {
      return false;
    }
    const item = {
      ele,
      imgSrc,
    };
    ele.src = init.default;

    if (checkCanShow(item)) {
      return false;
    }
    listeners.push(item);
    if (!init.lazyLoad) {
      init.lazyLoad = true;
      onListen(window, true);
    }
  };

  Vue.directive('lazyload', {
    inserted: addListener,
    update: addListener,
  });
};
