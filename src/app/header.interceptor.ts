import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  let updatedReq = req;

  if (localStorage.getItem('userToken') != null) {
    let token: any = localStorage.getItem('userToken');

    updatedReq = req.clone({
      headers: req.headers.set('token', token)
    })
    
  }
  return next(updatedReq);
};
