<template>
    <div>
        <header id="M_headBar" class="ui-head-bar">
            <div>
                <a class="arr" href="javascript:void(history.back());">
                <i class="icon-back"></i>
                </a>
            </div>
            <form id="search_from" action="/wall/s" class="title">
                <div class="search">
                <p class="search-keywords">
                    <input type="text" name="keywords" id="J_search_keywords" :value="id"/>
                </p>
                <a href="javascript:;" class="search-enter-btn J_search_btn"></a>
                </div>
            </form>
            <span class="badge icon-uniE810"></span>
        </header>
        <ul class="ul_nav">
            <li v-for="(item,index) in nav_data" :key="index">
                {{item.title}}
            </li>
        </ul>
    </div>
</template>
<script>
import data from '../static/data.json';
export default {
  data() {
    return {
        nav_data:data.data.sortFilter,
        id: this.$route.params.id,
    };
  },
  created() {
    console.log(this.id,this.nav_data);
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
body{
    background-color: #efefef;
}
.ui-head-bar {
  position: fixed;
  border-bottom: 1px solid #c9c7c8;
  width: 100%;
  height: 45px;
  top: 0;
  line-height: 45px;
  display: -webkit-flex;
  display: -webkit-box;
  background: #fafafa;
  z-index: 99;
}
.ui-head-bar .arr,
.ui-head-bar .subfield {
  display: inline-block;
  padding: 0 15px;
  height: 100%;
  color: #5e5e5e;
  font-size: 20px;
}
.ui-head-bar .icon-back {
  background: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzAzNzFFNkY2QTk1MTFFNTgwMjJGMjc1MkExMkI2OTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzAzNzFFNzA2QTk1MTFFNTgwMjJGMjc1MkExMkI2OTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MDM3MUU2RDZBOTUxMUU1ODAyMkYyNzUyQTEyQjY5NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MDM3MUU2RTZBOTUxMUU1ODAyMkYyNzUyQTEyQjY5NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAEAAQAMBEQACEQEDEQH/xABiAAEBAAMBAAAAAAAAAAAAAAAACQYHCAoBAQAAAAAAAAAAAAAAAAAAAAAQAAEEAgMAAQQCAwAAAAAAAAQCAwUGAAEHCAkSERMjFCFBIjIVEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD3oYDAYDAYDAYDAYDAYDAn93q9EOIejUDBtWIErkHlO3KbdqfE9ekxgJouI0SoYqyz0g6NIJrldS80scZ5Y77x5idtDsuJaKdGDtulWJ+3U2p2wqAmqoVZ6zBWEmr2MbQdhrb81FiyT0DOia2rQszDuE7HKb+u/g+2rX9YGTYDAYDAYE5fQ30MofSChNiiNgXPnm5gva4141+844lCXHHA0XO5oDcQaBT48xCkttoU2VLlNqFGUjSCihA5B88vPK+S98c72d7HD7n2JuZ7NspVKtjLbiuO1ONtKibNZolTTYYFwADbabhYVtpsWqittfiQehpqMC7GAwGAwGBOv0M9BaR0f4+HbGHFuXOl4EJa4u44+bzja16XsRVwt+g3GywqjGFq+KWm1ILlik/qjbRpJRQgceeefnnfJi+Od7O9jh1z7E3M5m2Umk2xlC1cdKWhtURZrNEKbQGBcAA0NNwsK202LVRW2vxIPQ01GBdfAYDAYDAYEtvSzzxF7j1eH5A47l3Kh2S4sA2rjqxakSY4CeCDNdmh6jKlMuJVDvplXFkRkm18XATHN7XvbS1bQGofN/0fmuTZojqT21HIoXayhPkVxh+xjohl8nKhUbQQMSO5ppgPkMMdr7hDDf4ZVnX7Yn11txtsLT4DAYDAYDAYEqfSDzfhe28KPynxYQxQu0dCYHNp1xCIXDJuCYZejIyt2STD20QHIBkNJVES6VaejntJSpW2N/jDV3m/6QTXJ00R1K7ajv0LtbQnyK4w/Yx0QyuTlQyNoIGJHXpocPkMMdr7hA7f0ZlGdftifXW3G2wtPgMBgMBgMBgS79B/NWqdxW4XkahTovE3ZGmvRzlc5KGbMGHmw4whsgCMtT0N8JVBEO8jTsZKD/M0BafjrTjW9IQFDOMoO21jjihVu+2nV5vEBTq1DXC56DTH6tdmjYcMOcsX6KP8Rf8AsyTLhHw1/r9z6fxgZxgMBgMBgMBgMBgMD//Z)
    50% no-repeat !important;
  background-size: 100% 100% !important;
}
.ui-head-bar .icon-back {
  background: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzAzNzFFNkY2QTk1MTFFNTgwMjJGMjc1MkExMkI2OTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzAzNzFFNzA2QTk1MTFFNTgwMjJGMjc1MkExMkI2OTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MDM3MUU2RDZBOTUxMUU1ODAyMkYyNzUyQTEyQjY5NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MDM3MUU2RTZBOTUxMUU1ODAyMkYyNzUyQTEyQjY5NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAEAAQAMBEQACEQEDEQH/xABiAAEBAAMBAAAAAAAAAAAAAAAACQYHCAoBAQAAAAAAAAAAAAAAAAAAAAAQAAEEAgMAAQQCAwAAAAAAAAQCAwUGAAEHCAkSERMjFCFBIjIVEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD3oYDAYDAYDAYDAYDAYDAn93q9EOIejUDBtWIErkHlO3KbdqfE9ekxgJouI0SoYqyz0g6NIJrldS80scZ5Y77x5idtDsuJaKdGDtulWJ+3U2p2wqAmqoVZ6zBWEmr2MbQdhrb81FiyT0DOia2rQszDuE7HKb+u/g+2rX9YGTYDAYDAYE5fQ30MofSChNiiNgXPnm5gva4141+844lCXHHA0XO5oDcQaBT48xCkttoU2VLlNqFGUjSCihA5B88vPK+S98c72d7HD7n2JuZ7NspVKtjLbiuO1ONtKibNZolTTYYFwADbabhYVtpsWqittfiQehpqMC7GAwGAwGBOv0M9BaR0f4+HbGHFuXOl4EJa4u44+bzja16XsRVwt+g3GywqjGFq+KWm1ILlik/qjbRpJRQgceeefnnfJi+Od7O9jh1z7E3M5m2Umk2xlC1cdKWhtURZrNEKbQGBcAA0NNwsK202LVRW2vxIPQ01GBdfAYDAYDAYEtvSzzxF7j1eH5A47l3Kh2S4sA2rjqxakSY4CeCDNdmh6jKlMuJVDvplXFkRkm18XATHN7XvbS1bQGofN/0fmuTZojqT21HIoXayhPkVxh+xjohl8nKhUbQQMSO5ppgPkMMdr7hDDf4ZVnX7Yn11txtsLT4DAYDAYDAYEqfSDzfhe28KPynxYQxQu0dCYHNp1xCIXDJuCYZejIyt2STD20QHIBkNJVES6VaejntJSpW2N/jDV3m/6QTXJ00R1K7ajv0LtbQnyK4w/Yx0QyuTlQyNoIGJHXpocPkMMdr7hA7f0ZlGdftifXW3G2wtPgMBgMBgMBgS79B/NWqdxW4XkahTovE3ZGmvRzlc5KGbMGHmw4whsgCMtT0N8JVBEO8jTsZKD/M0BafjrTjW9IQFDOMoO21jjihVu+2nV5vEBTq1DXC56DTH6tdmjYcMOcsX6KP8Rf8AsyTLhHw1/r9z6fxgZxgMBgMBgMBgMBgMD//Z)
    50% no-repeat;
  background-size: 100% 100%;
  width: 22px;
  height: 22px;
  display: inline-block;
  margin-top: 11px;
}
.ui-head-bar .title {
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    text-align: center;
    line-height: 45px;
    font-size: 18px;
    color: #5e5e5e;
    font-weight: 800;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.ui-head-bar .search {
    display: block;
    position: relative;
    border-radius: 1px;
    height: 30px;
    line-height: 30px;
    top: 7px;
    border: 1px solid #f3f3f3;
    background: #ececec url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAkCAIAAACFVbTMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRDJBNjRGRDY3NTUxMUU1QTZGQ0JFRTJEMjc5NzRBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRDJBNjRGRTY3NTUxMUU1QTZGQ0JFRTJEMjc5NzRBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVEMkE2NEZCNjc1NTExRTVBNkZDQkVFMkQyNzk3NEFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVEMkE2NEZDNjc1NTExRTVBNkZDQkVFMkQyNzk3NEFCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+id691QAABItJREFUeNrcl9dOHEEQRb2BnIMJAgRC/P83AQJEzjn6eI90ac/OgJ/84HlY9fRW9a1wq6qndXp6+uOfP+3qe7vd6XRardb7+/vHx0er97R7DwsE2CyFs0D+7e2t2+0ipozy7PPLmY2oKL++vj49PaEwMDCgPo8nlnge+vLyok0uBgcHHx8fg5dH9XKnW4HkaOzlFzmUsRGdh4eHm5ub29tbFs/Pz+wjMzQ0ND4+PjExMTIygomquIivPtqdwPz+K3kFAC+7vQfb3by/vz85OQEMJ1A2+PHAxeTk5NLSEtjsaHGJWklKFbXfrvPz88PDwwTN3OCQeDkUEwFbXl5eWFgw4CKFFp5fYn9G2PgkAcfHxwcHB8RcfuEKPk1NTQ0PD6PPPgHAYiJPqNlBnk2AeRVMPopd8bVbssNcIoeXQBJekPDjZ+8BG7/xDOPGxsZ4nZ+fv76+3t/fv7q6AuPy8hL1xcVFVOR8/Ktg/xFhM8dBu7u7QOIWr1tbW/I5/EJMbH59PTo6Ihf4yibyuMsiUa0pudLX995zdnaGTxxHJWxubkoQ9lU2r4IhABICOI2LUmx7e5uFqZEB/UH+RPW/u7s7KkRKz87OanLTw9EAy76ZmZnR0VG0MItoCSm5wvZ6VCRgB7FlQXhBLYus8oTJKlK709PTBuPi4iKoodVXHRFfNVAe9ZtZWmll52hQBSBa9jL3+02v5pWMElUWoNqqGjt4u52GYOIhkX2YtX2GtYn/ylfJaWskwrLmC1RJK7ZtCy1dTxHqayOq6UkaaiNTyWtKQgB1k+yU4jds6vQej8MP1vw2oeINBE4kmQp28rJUzH1l4FTz6rQSG0YkJWUM+Et+xglDLbOsZnbIscNA6ytha1fmJSRyHNIr0NTXxE0X9YBN82rV8het0cFMv8wYUKXibrtkB6jUqAqQmSYHsG1IdsgLYIinAUhdIkCts+YvOgZ2JE1fsUnDkabsTAzdlY5h5lQWBjGsYQESxjGO+N3b21OSDsWoNyRhXOMNBjmTQUc1bqjRVEONBEqHEAAAK2EQ9jGmzDQTnvrxyiEb0GrMqzMEDLAZ0bziAUEDmBGmveaSsxyiyCOws7PD4Eq1MHeRSWpyDaq/Szg+kXZ+OdVhjdca3GKkkzDiiYBHwzhQldcI1PEMd5nHrPHYWSsPalCRtmZyHcRFaCmNc820MCwJM+0lhFyi5WDnL9K0srKiWP9dolXewsvxmx5LhIkBxqb35qqsCnWCc4SByUGCud2RbEyZm5tbXV2t7RKtprt/sFHjOO4o/BJtbQdethN2i8S8AgCZAbZwqUM8Tgl9jxpgpXMdD0HKG2huZTZRLkBYqREkGI/Ly2LNfK3c7jUznS9PrIkduZ7xu7GxQQyUgXGwstIlut9+CelW7gP54HEm5sMk8VCAwLLAY4w24Oz8LWrMT3xS+PbetI64zj7Uo2yEAdLabbwP138dFDWTSNqocdRytNg4mleaKKyGesCvra2hy2J9fd0hWHMfrkW1jvu/D3ODCYHDPlu6SXEOlp+d33D43301/8+ovwQYAMOey27g8tSbAAAAAElFTkSuQmCC) 2px no-repeat;
    background-size: 17px 15px;
    text-align: left;
    display: -webkit-flex;
    display: -webkit-box;
}
.ui-head-bar .search-keywords {
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    overflow: hidden;
    padding: 0 5px 0 20px;
}
.ui-head-bar .search-keywords input[type=text] {
    vertical-align: top;
    line-height: 24px;
    border: 0;
    padding: 0;
    background: none;
    width: 100%;
    position: relative;
    top: 2px;
    font-size: 16px;
}
.ui-head-bar .search-enter-btn {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGwSURBVFiF7ZaxaxRBFIe/N3uwd0UQIY2WJo2VxELuH7hZjsCBxWECCWplFexjdV2KCNoIaey0iN01d8M1dtcKttoIgpBwhaLN7c1LcSnCkln3Etdr9pW/+e28jzfz3o6oKssMs9TsFUAFUAEAtZL2FefcW+AhMAUOkiR5eZmxlAqMRqN7wBPgBrAK9ELeUgDSNK1npGClSwGIoqjwfC8FQFWnGSn6rwDGGJ+RgkewUBc4556KyGNg01r7O+RT1Tgjza4F0O/3V+I4PgK2z3/ft4AvOQCbGenTlQEGg8FGHMfHwPqFBDcv8/Z6PdNsNveA/czSx9D+kvcgGQ6Hz0TkNZAt6Q/gG/PLFQFyrt8BVjLen977++12++tCAM65V8DzIF3xeJQkyXFoMdgFInL7molPRGQnL3kuwHg83lLVfeazvGj8Acaqelir1e5aa9/97YPcOwDgnHsAvAfWLsgvjDEfZrPZ1Huv3vu00Wikk8nktNvtBlvuSgAwb8N6vf5GVXcAjDEbrVYr2FqLRKFJ2Ol0fllrd1V1W0Q+p2n6/V8kh4IVKDOW/iKqACqACuAMa+6N+LNUkowAAAAASUVORK5CYII=) 50% no-repeat;
    background-size: 100% 100%;
    width: 25px;
    height: 25px;
    display: inline-block;
    margin: 0 5px;
}
ui-head-bar .badge, .ui-head-bar .badge * {
    color: #727272!important;
}
.ui-head-bar .badge {
    display: inline-block;
    width: 50px;
    text-align: center;
    position: relative;
}
.ui-head-bar .icon-uniE810:before {
    background-size: 100%;
    background-position: 50%;
    width: 22px;
    height: 21px;
    display: inline-block;
    content: " "!important;
    position: relative!important;
    left: 0!important;
    top: 5px;
    background-image: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mjk1NTdDM0M2NzU3MTFFNUE2RkNCRUUyRDI3OTc0QUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdFNDg0N0M2NzVGMTFFNUE2RkNCRUUyRDI3OTc0QUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOTU1N0MzQTY3NTcxMUU1QTZGQ0JFRTJEMjc5NzRBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOTU1N0MzQjY3NTcxMUU1QTZGQ0JFRTJEMjc5NzRBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEB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);
}
.ul_nav{
    margin-top: 50px;
}
</style>