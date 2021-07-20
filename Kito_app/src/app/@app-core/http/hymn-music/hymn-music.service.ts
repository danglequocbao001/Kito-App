import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { requestQuery } from '../../utils';
import { APICONFIG } from '../@http-config/api';
import { IPageRequest } from '../global';

@Injectable({
	providedIn: 'root'
})

export class HymnMusicService {
	constructor(
		private http: HttpClient,
	) { }

	public getAll(request: IPageRequest) {
		return this.http.get<any>(`${APICONFIG.MUSIC.GET_ALL}?${(requestQuery(request))}`).pipe(
			map((result) => {
				return result;
			}),
			catchError((errorRes: any) => {
				throw errorRes.error;
			})
		)
	}

	public getDetail(id) {
		return this.http.get(`${APICONFIG.MUSIC.GET_DETAIL(id)}`).pipe(
			map((result) => {
				return result;
			}),
			catchError((errorRes) => {
				throw errorRes.error;
			})
		)
	}

	public getAllFavorite(request: IPageRequest) {
		return this.http.get<any>(`${APICONFIG.MUSIC.GET_ALL_FAVORITE}?${(requestQuery(request))}`).pipe(
			map((result) => {
				return result;
			}),
			catchError((errorRes) => {
				throw errorRes.error;
			})
		)
	}

	public favorite(songId) {
		const req = {
			favourite_song: {
				song_id: songId
			}
		}
		return this.http.post(`${APICONFIG.MUSIC.FAVORITE}`, req).pipe(
			map((result) => {
				return result;
			}),
			catchError((errorRes) => {
				throw errorRes.error;
			})
		)
	}

	public unfavorite(songId) {
		const option = {
			body: {
				favourite_song: {
					song_id: songId
				}
			}
		}

		return this.http.request<any>('delete', `${APICONFIG.MUSIC.UNFAVORITE}`, option).pipe(
			map((result) => {
				return result;
			}),
			catchError((errorRes: any) => {
				throw errorRes.error;
			}));
	}

	public getAllLectureVideo(request: IPageRequest) {
		return this.http.get<any>(`${APICONFIG.VIDEO.GET_ALL}?${(requestQuery(request))}`).pipe(
			map((result) => {
				return result;
			}),
			catchError((errorRes: any) => {
				throw errorRes.error;
			})
		)
	}
	public getAllBibleSong(request: IPageRequest) {
		return this.http.get<any>(`${APICONFIG.VIDEO.GET_BIBEL_SONG}?${(requestQuery(request))}`).pipe(
			map((result) => {
				return result
			}),
			catchError((errorRes: any) => {
				throw errorRes.console.error;

			})
		)
	}
	public getBibleSongDetail(id: string) {
		return this.http.get<any>(`${APICONFIG.VIDEO.GET_BIBLE_SONG_DETAIL(id)}`).pipe(
			map((result) => {
				return result;
			}),
			catchError((errorRes) => { throw errorRes.error; }));
	}
}