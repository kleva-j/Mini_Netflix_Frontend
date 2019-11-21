import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.css']
})
export class MovieThumbnailComponent implements OnInit {
  datalist: Array<IMovie> = [
    {
      url: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      title: 'The Avengers',
      likes: 25,
      comments: 45,
    },
    {
      url: 'https://m.media-amazon.com/images/M/MV5BMjAwNTljOTgtYzk0NS00OGMzLTgzMDUtZDc2YjhjNzU3Yjg5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
      title: 'The flash',
      likes: 20,
      comments: 55,
    },
    {
      url: 'https://m.media-amazon.com/images/M/MV5BMTU5NjQ2MTU4NV5BMl5BanBnXkFtZTgwOTYyNTAwNzM@._V1_SX300.jpg',
      title: 'Gotham',
      likes: 20,
      comments: 55,
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTefrBdMfwlrs4uLczdEH9lqFBTu96ZjZCeRtw7BgqVaGkaui6E',
      title: 'Avengers - Infinity War',
      likes: 20,
      comments: 55,
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRimUDqpN0TboqEH5Ou-2NbiZQWNnIEU6kPvZCQzZqbjGcVyVi-',
      title: 'Iron Man',
      likes: 20,
      comments: 55,
    },
  ];

  width: number;
  height: number;

  constructor() { }

  ngOnInit() {

  }

  compressImage(image, width, height) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
      const img = new Image();
      // @ts-ignore
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], image, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
        }, 'image/jpeg', 1);
      },
      reader.onerror = error => console.log(error);
    };
  }

  invertImgColor(imageId) {
    const img = document.getElementById(imageId);
    const canvas = document.getElementById('canvas');
    // @ts-ignore    
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);

    //@ts-ignore
    const imgData = context.getImageData(0, 0, img.width, img.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = 255 - imgData.data[i];
      imgData.data[i+1] = 255 - imgData.data[i+1];
      imgData.data[i+2] = 255 - imgData.data[i+2];
      imgData.data[i+3] = 255;
    }
    context.putImageData(imgData, 0, 0);
  }

}
