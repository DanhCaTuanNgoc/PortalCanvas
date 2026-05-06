# PortalCanvas Implementation Plan

Kế hoạch này chia việc triển khai PortalCanvas thành các phase rõ ràng, bám theo mục tiêu sản phẩm: một công cụ visual builder nhẹ, local-first, hỗ trợ model, inspect, và runtime cho Portaldot contracts.

## Phase 0: Alignment & Scope

Status: Completed. See [PHASE_0_ALIGNMENT_SCOPE.md](PHASE_0_ALIGNMENT_SCOPE.md).

Mục tiêu:
- Chốt phạm vi MVP.
- Xác định luồng người dùng chính.
- Đồng bộ giữa spec, UI, và dữ liệu runtime Portaldot.

Việc cần làm:
- Rà lại technical spec và xác định những node nào là bắt buộc cho MVP.
- Chốt stack chính cho web app, SDK, và nguồn dữ liệu chain.
- Xác định các màn hình chính: homepage, canvas, inspection panel, runtime panel.

Deliverables:
- Danh sách scope MVP.
- Danh sách out-of-scope.
- User flow sơ bộ.

Done when:
- Team có thể mô tả PortalCanvas bằng 1 flow ngắn và nhất quán.

## Phase 1: Foundation

Status: In progress. See [PHASE_1_FOUNDATION.md](PHASE_1_FOUNDATION.md).

Mục tiêu:
- Thiết lập nền tảng dự án để phát triển nhanh và ổn định.

Việc cần làm:
- Dọn cấu trúc repo.
- Thiết lập Next.js web app.
- Thiết lập styling, layout, typography, và design tokens.
- Chuẩn hóa `.gitignore`, scripts, và README.

Deliverables:
- Web app chạy local ổn định.
- Homepage scaffold.
- Cấu trúc thư mục rõ ràng cho UI và logic.

Done when:
- `npm run build` pass.
- Trang home hiển thị đúng branding và skeleton chính.

## Phase 2: Visual Modeling MVP

Mục tiêu:
- Xây phần canvas whiteboard để mô hình hóa contract bằng node và edge.

Việc cần làm:
- Tạo node system cho contract, entity, storage, action, event, permission, fee, network/account, UI screen.
- Tạo cơ chế drag, connect, select, và inspect node.
- Hiển thị metadata cơ bản của từng node.

Deliverables:
- Canvas có thể dựng một graph đơn giản.
- Panel hiển thị chi tiết node đang chọn.
- Trạng thái lưu tạm trong local state.

Done when:
- Người dùng có thể dựng một graph cơ bản cho một contract mẫu.

## Phase 3: Inspection Layer

Mục tiêu:
- Cho người dùng hiểu contract hoạt động thế nào từ graph.

Việc cần làm:
- Hiển thị input parameters, permission, reads/writes, events, và fee estimate.
- Thêm bảng hoặc sidebar cho action details.
- Kết nối node quan hệ giữa action, storage, event, và fee inspector.

Deliverables:
- Panel inspect rõ ràng cho từng node.
- Mối quan hệ giữa action và storage/event thể hiện trực quan.

Done when:
- Một action node có thể giải thích được gọi bởi ai, chạm storage nào, và phát event gì.

## Phase 4: Runtime Integration

Mục tiêu:
- Kết nối PortalCanvas với Portaldot local node hoặc mainnet.

Việc cần làm:
- Tích hợp WebSocket connection tới `ws://127.0.0.1:9944`.
- Đọc account, block, balance, extrinsic hash, block hash, và event log.
- Ước lượng fee và hiển thị kết quả sau khi execute.

Deliverables:
- Runtime status panel.
- Dữ liệu live hoặc replay từ chain.
- Trạng thái kết nối chain rõ ràng.

Done when:
- Một thao tác demo có thể hiển thị dữ liệu chain thực.

## Phase 5: Portaldot SDK & Contract Operations

Mục tiêu:
- Hỗ trợ các tác vụ thực tế với contract và chain.

Việc cần làm:
- Tạo wrapper cho query/query_multi/query_map.
- Tạo luồng gửi extrinsic và theo dõi inclusion/finalization.
- Hỗ trợ đọc và gọi smart contract ink!.

Deliverables:
- API layer cho web app.
- Helper functions cho contract read/exec.
- Demo flow end-to-end với dữ liệu thật.

Done when:
- Người dùng có thể mô hình hóa và thực thi một contract flow nhỏ.

## Phase 6: UX Polish & Demo Readiness

Mục tiêu:
- Làm sản phẩm đủ rõ, đủ đẹp, và đủ chắc cho hackathon/demo.

Việc cần làm:
- Tối ưu layout desktop/mobile.
- Thêm motion nhẹ cho section, community, và states.
- Hoàn thiện empty states, loading states, error states.
- Viết copy hướng dẫn rõ ràng cho người mới.

Deliverables:
- Homepage và app UI nhất quán.
- Trải nghiệm mượt khi demo.
- Tài liệu giới thiệu ngắn gọn.

Done when:
- Demo không cần giải thích quá nhiều mới hiểu.

## Phase 7: QA, Hardening & Release

Mục tiêu:
- Đảm bảo build, runtime, và luồng chính ổn định.

Việc cần làm:
- Chạy build/lint/test nếu có.
- Kiểm tra các lỗi kết nối chain.
- Kiểm tra lại import, path alias, và cấu hình TypeScript.
- Chuẩn bị tag hoặc release notes.

Deliverables:
- Checklist QA.
- Bản phát hành nội bộ hoặc bản demo.

Done when:
- Repo sẵn sàng để trình bày hoặc bàn giao.

## Suggested Execution Order

1. Phase 0: Alignment & Scope
2. Phase 1: Foundation
3. Phase 2: Visual Modeling MVP
4. Phase 3: Inspection Layer
5. Phase 4: Runtime Integration
6. Phase 5: Portaldot SDK & Contract Operations
7. Phase 6: UX Polish & Demo Readiness
8. Phase 7: QA, Hardening & Release

## Notes

- Ưu tiên local-first, không đặt giả định kiểu EVM.
- Core token của hệ là POT, decimals là 14.
- Endpoint chính cần hỗ trợ: `ws://127.0.0.1:9944` và `wss://mainnet.portaldot.io`.
- Kế hoạch này nên được cập nhật khi phạm vi MVP thay đổi.