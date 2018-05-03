import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  constructor(private http: Http) { }

  sendEmail(emailAddress, content) {

    let url = `https://saludencasa-ce8a5.firebaseapp.com/`
    let params: URLSearchParams = new URLSearchParams();
    let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    params.set('to', emailAddress);
    params.set('from', 'appfirebaseempresariales@gmail.com');
    params.set('subject', 'test-email');
    params.set('content', content);

    return this.http.post(url, params, headers)
                    .toPromise()
                    .then( res => {
                      console.log(res)
                    })
                    .catch(err => {
                      console.log(err)
                    })
  }

  ngOnInit() {
  }

}
