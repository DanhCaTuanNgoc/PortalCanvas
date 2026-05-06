# Portaldot - Báo cáo kiểm thử và tóm tắt năng lực

Tài liệu này ghi lại những gì đã kiểm tra với công nghệ Portaldot, kết quả chạy thực tế trong môi trường hiện tại, và các tính năng chính có thể khai thác bằng Portaldot.

## Mục lục

- [Mục tiêu](#mục-tiêu)
- [Những gì đã làm](#những-gì-đã-làm)
- [Kết quả đã xác minh](#kết-quả-đã-xác-minh)
- [Portaldot có thể làm gì](#portaldot-có-thể-làm-gì)
- [Lưu ý kỹ thuật](#lưu-ý-kỹ-thuật)
- [Kết luận](#kết-luận)

## Mục tiêu

Mục tiêu của bài kiểm tra là xác nhận Portaldot có thể được sử dụng theo kiểu "chạy trên terminal" thông qua Python SDK và local node, đồng thời liệt kê những khả năng thực tế của công nghệ này.

## Những gì đã làm

### 1. Đọc và phân tích tài liệu

- Đọc tài liệu Portaldot Dev.
- Tách các phần chính gồm:
  - Introduction
  - Chain Info
  - Getting Started
  - Python SDK
  - SDK Extension
  - Module Interface

### 2. Kiểm tra môi trường

- Xác nhận máy đang chạy Windows.
- Kiểm tra và xác nhận Ubuntu đã được cài trong WSL2.

### 3. Cài đặt SDK

- Cài Python package `substrate-interface` để dùng Portaldot SDK.

### 4. Thử kết nối tới mainnet

- Thử kết nối Portaldot mainnet bằng Python.
- Phát hiện một số lệch phiên bản giữa tài liệu và thư viện thực tế:
  - `type_registry_preset='default'` không còn hợp lệ trong bản SDK đang dùng.
  - Một số lệnh decode storage/block trên mainnet vướng kiểu metadata chưa được hỗ trợ đầy đủ trong môi trường này.

### 5. Chuyển sang local dev node

- Chạy local development node trong Ubuntu WSL2 theo đúng hướng dẫn tài liệu.
- Tải client local development của Portaldot.
- Giải nén và khởi chạy node dev với `--dev --alice`.
- Xác nhận node local mở RPC tại `127.0.0.1:9944`.

### 6. Chạy thử end-to-end

Đã chạy một ví dụ thực tế gồm các bước:

1. Tạo call `Balances.transfer_keep_alive`.
2. Ký extrinsic bằng `//Alice`.
3. Gửi extrinsic lên local node.
4. Xác nhận extrinsic được include thành công.
5. Đọc lại storage để kiểm tra balance sau giao dịch.

## Kết quả đã xác minh

- Local node đã chạy được.
- RPC local hoạt động bình thường.
- Gửi extrinsic thành công.
- Query storage sau giao dịch thành công.
- Luồng end-to-end trong môi trường hiện tại đã được xác minh.

## Portaldot có thể làm gì

### Kết nối chain

- Kết nối tới mainnet hoặc local dev node qua WebSocket.
- Đọc chain head, block header, block info.

### Đọc state / storage

- Query storage đơn lẻ như `System.Account`.
- Query nhiều key cùng lúc bằng `query_multi()`.
- Query map hoặc double-map bằng `query_map()`.
- Đọc state theo block hash cũ.

### Gửi giao dịch

- Tạo call và extrinsic.
- Ký giao dịch bằng keypair.
- Gửi extrinsic và chờ inclusion hoặc finalization.
- Ước lượng fee trước khi gửi.

### Quản lý khóa

- Tạo mnemonic.
- Sinh keypair từ mnemonic, URI derivation path hoặc JSON keystore.
- Ký và verify message.

### Runtime APIs

- Gọi runtime API trực tiếp.
- Tra danh sách runtime call có sẵn.

### Multisig

- Tạo multisig account.
- Tạo và hoàn tất multisig extrinsic.

### Smart contract ink!

- Deploy contract.
- Tạo instance contract.
- Read và exec contract.
- Estimate gas trước khi gọi.

### SDK Extension

- Lọc event hoặc extrinsic theo block range.
- Tìm block theo thời gian.
- Lấy timestamp của block.

### Module Interface

- Tra constants, errors, events, extrinsics, RPC và storage của từng pallet/module.

## Lưu ý kỹ thuật

- Tài liệu Portaldot đang mô tả một số API theo kiểu cũ hơn so với `substrate-interface` bản hiện tại.
- Với local node, dùng preset `substrate-node-template` thì tương thích tốt hơn trong môi trường đã thử.
- Trên mainnet, một số lệnh query hoặc decode có thể cần type registry phù hợp hơn hoặc phiên bản SDK khác.

## Kết luận

Portaldot hoàn toàn có thể được dùng theo kiểu chạy trên terminal bằng Python SDK và WSL/Ubuntu local node.

Trong môi trường đã thử, cách ổn định nhất là:

- Chạy node local bằng binary Ubuntu trong WSL.
- Kết nối qua `ws://127.0.0.1:9944`.
- Dùng `substrate-interface` để query và gửi extrinsic.
- Chọn type registry phù hợp với chain dev.

## Gợi ý tiếp theo

Nếu muốn mở rộng tài liệu này, có thể bổ sung thêm:

- Hướng dẫn cài đặt từ đầu đến cuối.
- Ví dụ đọc balance.
- Ví dụ gửi transfer.
- Ví dụ multisig.
- Ví dụ deploy và gọi smart contract.
- Danh sách lỗi thường gặp và cách xử lý.