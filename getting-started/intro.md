> ## Mục lục tài liệu
> Xem toàn bộ chỉ mục tài liệu tại: https://modelcontextprotocol.io/llms.txt
Hãy sử dụng tệp này để khám phá tất cả các trang có sẵn trước khi tìm hiểu thêm.

# Giao thức ngữ cảnh mô hình (MCP) là gì?

MCP (Model Context Protocol) là một tiêu chuẩn mã nguồn mở để kết nối các ứng dụng trí tuệ nhân tạo với các hệ thống bên ngoài.

Sử dụng MCP, các ứng dụng AI như Claude hoặc ChatGPT có thể kết nối với các nguồn dữ liệu (ví dụ: tệp cục bộ, cơ sở dữ liệu), công cụ (ví dụ: công cụ tìm kiếm, máy tính) và quy trình làm việc (ví dụ: lời nhắc chuyên biệt) — cho phép chúng truy cập thông tin quan trọng và thực hiện các tác vụ.

Hãy hình dung MCP như một cổng USB-C dành cho các ứng dụng AI. Cũng giống như USB-C cung cấp một cách thức tiêu chuẩn để kết nối các thiết bị điện tử, MCP cung cấp một cách thức tiêu chuẩn để kết nối các ứng dụng AI với các hệ thống bên ngoài.

<Khung>
  <img src="https://mintcdn.com/mcp/bEUxYpZqie0DsluH/images/mcp-simple-diagram.png?fit=max&auto=format&n=bEUxYpZqie0DsluH&q=85&s=35268aa0ad50b8c385913810e7604550" width="3840" height="1500" data-path="images/mcp-simple-diagram.png" />
</Khung>

## MCP có thể hỗ trợ những gì?

* Các nhân viên hỗ trợ có thể truy cập Lịch Google và Notion của bạn, đóng vai trò như một trợ lý AI cá nhân hóa hơn.
* Claude Code có thể tạo ra toàn bộ ứng dụng web bằng cách sử dụng thiết kế Figma.
* Chatbot doanh nghiệp có thể kết nối với nhiều cơ sở dữ liệu trong toàn tổ chức, cho phép người dùng phân tích dữ liệu thông qua trò chuyện.
* Các mô hình AI có thể tạo ra các thiết kế 3D trên Blender và in chúng ra bằng máy in 3D.

## Tại sao MCP lại quan trọng?

Tùy thuộc vào vị trí của bạn trong hệ sinh thái, MCP có thể mang lại nhiều lợi ích khác nhau.

* **Dành cho nhà phát triển**: MCP giúp giảm thời gian và độ phức tạp trong quá trình phát triển khi xây dựng hoặc tích hợp với ứng dụng hoặc tác nhân AI.
* **Ứng dụng hoặc tác nhân AI**: MCP cung cấp quyền truy cập vào hệ sinh thái các nguồn dữ liệu, công cụ và ứng dụng giúp tăng cường khả năng và cải thiện trải nghiệm người dùng cuối.
* **Người dùng cuối**: MCP giúp tạo ra các ứng dụng hoặc tác nhân AI mạnh mẽ hơn, có thể truy cập dữ liệu của bạn và thực hiện các hành động thay mặt bạn khi cần thiết.

## Hỗ trợ hệ sinh thái rộng rãi

MCP là một giao thức mở được hỗ trợ trên nhiều loại máy khách và máy chủ. Các trợ lý AI như [Claude](https://claude.com/docs/connectors/building) và [ChatGPT](https://developers.openai.com/api/docs/mcp/), các công cụ phát triển như [Visual Studio Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers), [Cursor](https://cursor.com/docs/context/mcp), [MCPJam](https://docs.mcpjam.com/getting-started) và nhiều công cụ khác đều hỗ trợ MCP — giúp việc xây dựng một lần và tích hợp ở mọi nơi trở nên dễ dàng.

## Bắt đầu xây dựng

<CardGroup cols={2}>
  <Card title="Máy chủ xây dựng" icon="server" href="/docs/2026-07-28/develop/build-server">
    Tạo máy chủ MCP để hiển thị dữ liệu và công cụ của bạn.
  </Card>

  <Card title="Xây dựng máy khách" icon="máy tính" href="/docs/2026-07-28/develop/build-client">
    Phát triển các ứng dụng kết nối với máy chủ MCP.
  </Card>

  <Card title="Xây dựng ứng dụng MCP" icon="mảnh ghép" href="/extensions/apps/overview">
    Xây dựng các ứng dụng tương tác chạy bên trong các ứng dụng khách AI.
  </Card>
</CardGroup>

Tìm hiểu thêm

<CardGroup cols={2}>
  <Card title="Hiểu các khái niệm" icon="sách" href="/docs/2026-07-28/learn/architecture">
    Tìm hiểu các khái niệm cốt lõi và kiến trúc của MCP.
  </Card>
</CardGroup>