export default function PageFooter({ shown, total }) {
  return (
    <footer className="page-footer">
      Menampilkan {shown} dari {total} produk
    </footer>
  );
}
