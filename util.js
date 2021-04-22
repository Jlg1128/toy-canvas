// 是否在指定区域内
function isInRect(currentMousePos, startPos, endPos) {
  // console.log('currentMousePos', currentMousePos);
  // console.log('startPos', startPos);
  // console.log('endPos', endPos);
  let maxStartX = startPos.x - endPos.x > 0 ? startPos.x : endPos.x;
  let minStartX = startPos.x - endPos.x <= 0 ? startPos.x : endPos.x
  let maxEndY = startPos.y - endPos.y > 0 ? startPos.y : endPos.y;
  let minEndY = startPos.y - endPos.y <= 0 ? startPos.y : endPos.y;
  if ((currentMousePos.x > minStartX && currentMousePos.x < maxStartX) &&
    (currentMousePos.y > minEndY && currentMousePos.y < maxEndY)
  ) {
    return true;
  }
  return false;
}

// 是否在指定角上
function isInTangel(currentMousePos) {
  let tangles = Array.prototype.slice.call(arguments, 1);
  return tangles.some((tangel) => isInRect(currentMousePos, {
    x: tangel.x - 3,
    y: tangel.y - 3,
  }, {
    x: tangel.x + 3,
    y: tangel.y + 3,
  }))
}

function getStartSide(current, topLeft, topRight, bottomLeft, bottomRight) {
  if (isInTangel(current, topLeft)) {
    return 'top-left';
  } else if (isInTangel(current, topRight)) {
    return 'top-right';
  } else if (isInTangel(current, bottomLeft)) {
    return 'bottom-left';
  } else if (isInTangel(current, bottomRight)) {
    return 'bottom-right';
  } else {
    return 'top-right';
  }
}

function download(src, filename) {
  let a = document.createElement('a');
  a.download = filename || '这是您裁剪的图片呦';
  a.href = src;
  a.click();
  a = null;
}

function loadImg(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = function () {
      resolve(img);
    }
    img.onerror = function (err) {
      reject(err);
      console.log('err', err);
    }
  })
}