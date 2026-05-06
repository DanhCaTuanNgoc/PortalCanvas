# PortalCanvas Phase 0: Alignment & Scope

## Mục tiêu

Chốt phạm vi MVP cho PortalCanvas trước khi bước vào xây dựng chức năng. Giai đoạn này xác định rõ sản phẩm cần làm gì, không làm gì, và luồng người dùng chính để team triển khai nhất quán.

## Product Direction

PortalCanvas là một công cụ local-first, lightweight, tập trung vào việc mô hình hóa Portaldot contracts dưới dạng graph trắng bảng. Sản phẩm ưu tiên 3 lớp chính:

1. Visual modeling layer
   - Dựng contract thành node và edge.
2. Inspection layer
   - Hiển thị parameters, permissions, storage, events, và fee data.
3. Runtime layer
   - Kết nối Portaldot local node hoặc mainnet để đọc dữ liệu thực.

## MVP Scope

### In scope

- Homepage giới thiệu PortalCanvas rõ ràng và phù hợp với Portaldot.
- Canvas để mô hình hóa contract bằng nodes.
- Các node cốt lõi:
  - Contract
  - Entity
  - Storage
  - Action
  - Event
  - Permission
  - Fee Inspector
  - Network / Account
  - UI Screen
- Khung inspect cho node đang chọn.
- Kết nối runtime tối thiểu tới local node qua WebSocket.
- Hiển thị dữ liệu cơ bản:
  - account
  - balance
  - latest block
  - extrinsic hash
  - block hash
  - fee estimate
- Demo flow đơn giản cho một contract mẫu.
- UI local-first, không giả định EVM.

### Out of scope

- Multi-tenant SaaS.
- Cloud sync hoặc auth hệ thống phức tạp.
- Real-time collaboration nhiều người.
- Advanced permission editor dạng enterprise.
- Full contract IDE hoặc code editor thay thế VS Code.
- Multi-chain abstraction ngoài Portaldot.
- Marketplace, billing, analytics, hoặc deployment orchestration.

## Target Users

- Hackathon builders cần demo nhanh.
- Web2 developers học Portaldot native.
- Rust / ink! developers cần cách nhìn graph dễ hiểu hơn.
- Team prototype các use case như identity, payments, DAO, game assets, workflow.

## Key Product Principles

- Local-first trước hết.
- Portaldot-native, không EVM assumption.
- Tập trung vào readability và explainability.
- Giữ sản phẩm nhỏ gọn, dễ demo, dễ mở rộng.
- Mọi node trên canvas phải phục vụ việc hiểu contract hoặc runtime.

## Primary User Flow

1. Người dùng mở homepage.
2. Người dùng đi vào canvas.
3. Người dùng tạo hoặc xem graph contract mẫu.
4. Người dùng chọn một node để inspect chi tiết.
5. Người dùng kết nối local node hoặc mainnet.
6. Người dùng xem fee, balance, block, và event data.
7. Người dùng dùng graph để chuẩn bị demo hoặc giải thích contract.

## Success Criteria

Phase 0 hoàn thành khi:

- Phạm vi MVP được xác nhận rõ ràng.
- Team biết chính xác các screen và node cần xây dựng trước.
- Có user flow ngắn gọn để làm chuẩn cho implementation.
- Các phần ngoài scope được ghi rõ để tránh phình sản phẩm.

## Recommended Build Order After Phase 0

1. Foundation
2. Visual Modeling MVP
3. Inspection Layer
4. Runtime Integration
5. Portaldot SDK & Contract Operations
6. UX Polish & Demo Readiness
7. QA, Hardening & Release

## Notes

- Endpoint local ưu tiên: `ws://127.0.0.1:9944`
- Endpoint mainnet: `wss://mainnet.portaldot.io`
- Token: `POT`
- Decimals: `14`
- Tất cả UI và copy nên giữ đúng ngữ cảnh Portaldot native.
