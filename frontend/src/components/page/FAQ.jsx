import React from 'react';
import { NavLink } from 'react-router-dom';

const FAQ = () => {
  return (
    <div className='faq'>
      <div className='faq-question'>
      <h1 className='faq-title'>Câu hỏi thường gặp</h1>
      <h2>1. Xem phim bị chậm, mặc dù đã kích hoạt VIP Mode cho phim đó?</h2>
        <p>Nếu phim chạy nhưng cứ một đoạn lại bị dừng để chờ load tiếp, hãy lần lượt thử các cách sau:</p>
        <ul>
            <li>Chọn một server khác từ các server bên dưới phim.</li>
            <li>Thử xem trên một thiết bị khác (máy tính / điện thoại / TV...). Nếu phim chạy mượt trên thiết bị khác, điều này có thể do thiết bị cũ của bạn. Hãy thử dùng một trình duyệt khác trên thiết bị cũ để xem.</li>
            <li>Tắt modem 1 phút rồi bật lại.</li>
        </ul>
        <p>Nếu đã thử tất cả những cách trên mà phim vẫn chạy chậm, có thể băng thông đường truyền quốc tế mạng của bạn đang bị nghẽn (do dùng vào giờ cao điểm hoặc <a target="_blank" href='https://vnexpress.net/cap-quang-bien-viet-nam-dut-10-lan-moi-nam-4403945.html'>đứt cáp biển</a>). Bạn có thể thử xem bằng 4G xem có cải thiện không (4G thường được các nhà mạng ưu tiên băng thông).</p>

      <h2>2. Phim bị giật hình (hình ảnh nhảy lên nhảy xuống) khi xem full màn hình?</h2>
        <p>Hiện tượng này hay gặp khi xem phim trên Windows với các phiên bản trình duyệt gần đây, do các trình duyệt mới có tính năng tăng tốc phần cứng (hardware acceleration). Hãy tắt chế độ này đi và <a target="_blank" href='https://www.youtube.com/watch?v=h-nieRl4HFw&t=314s'>xem hướng dẫn</a>. Nếu vẫn bị, hãy đổi trình duyệt khác (Chrome / Firefox / Edge / Opera...).</p>

      <h2>3. Gặp vấn đề về âm thanh: phim không có tiếng, mất tiếng nhân vật, hoặc âm thanh bị rè?</h2>
        <ul>
            <li>Nếu xem trên điện thoại: Lỗi âm thanh là do trình duyệt của bạn (thường là Chrome). Hãy dùng trình duyệt <a target="_blank" href='https://play.google.com/store/apps/details?id=org.mozilla.firefox'>Firefox</a> hoặc <a target="_blank" href='https://apkmody.io/vi/ung-dung/app-420462531127561922'>Puffin</a>!</li>
            <li>Nếu bạn xem trên PC: Khác với phim / clip trên các web khác (kể cả Youtube), phim trên XemPhim sử dụng âm thanh 5.1 (6 channel) thay vì âm thanh stereo (2 channel). Nếu thiết bị bạn xem chỉ có 2 loa, bạn cần thiết lập chương trình quản lý âm thanh trên thiết bị cho đúng: chọn đúng chế độ với số loa mình có (stereo), đừng chọn nhiều hơn, nếu không thiết bị của bạn sẽ cố gắng xuất âm thanh ra những loa không tồn tại và gây ra mất tiếng.</li>
        </ul>
      
      <p>Ví dụ đây là phần chọn các chế độ âm thanh của Realtek HD Audio Manager: <a target="_blank" href="https://imgur.com/a/D6nPGcl">click vào đây</a></p>

      <h2>4. Làm sao để xem phim trên TV?</h2>
      <p>Để xem phim trên TV, TV của bạn phải có trình duyệt web. Hầu hết các loại Smart TV những năm gần đây đều có cài sẵn trình duyệt. Nếu TV của bạn không có sẵn trình duyệt, bạn có thể cài trình duyệt từ cửa hàng ứng dụng (Google Play Store / CH Play / App Store) trên TV. Với TV Android, bạn nên cài trình duyệt Puffin. Sau khi cài trình duyệt, truy cập trang web như bạn vẫn làm trên máy tính / điện thoại và xem phim.</p>
      <p>Nếu bạn không thể xem phim bằng trình duyệt trên TV, bạn có thể kết nối máy tính với TV (thường qua cổng HDMI) rồi phát từ máy tính lên TV.</p>
      </div>
    </div>
  );
};

export default FAQ;
