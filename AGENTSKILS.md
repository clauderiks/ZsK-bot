> ## Mục lục tài liệu
Xem toàn bộ chỉ mục tài liệu tại: https://agentskills.io/llms.txt
Hãy sử dụng tệp này để khám phá tất cả các trang có sẵn trước khi tìm hiểu thêm.

# Tổng quan về kỹ năng của đại lý

> Một phương pháp tiêu chuẩn hóa để cung cấp cho các tác nhân AI những khả năng và chuyên môn mới.

export const LogoCarousel = ({clients}) => {
  const [shuffled, setShuffled] = useState(clients);
  useEffect(() => {
    const shuffle = items => {
      const copy = [...items];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      trả lại bản sao;
    };
    setShuffled(shuffle(clients));
  }, []);
  const doubled = [...shuffled, ...shuffled];
  const GAP_PX = 48;
  const PX_PER_SECOND = 40;
  const cycleWidth = shuffled.reduce((sum, client) => sum + 150 * (client.scale || 1) + GAP_PX, 0);
  const cycleDuration = cycleWidth / PX_PER_SECOND;
  const Logo = ({client}) => <a href={client.url} className="block no-underline border-none w-full h-full">
      <img className="block dark:hidden object-contain w-full h-full !my-0" src={client.lightSrc} alt={client.name} noZoom />
      <img className="hidden dark:block object-contain w-full h-full !my-0" src={client.darkSrc} alt={client.name} noZoom />
    </a>;
  trả về <div className="logo-carousel">
      <div className="logo-carousel-track" style={{
    hoạt ảnh: `logo-scroll ${cycleDuration}s linear infinite`
  }}>
        {doubled.map((client, i) => <div key={`${client.name}-${i}`} style={{
    chiều rộng: 150 * (client.scale || 1),
    maxWidth: "100%"
  }}>
            <Logo client={client} />
          </div>)}
      </div>
    </div>;
};

xuất khẩu const clients = [{
  Tên: "Junie"
  Mô tả: "Junie là một công cụ lập trình độc lập với LLM, được xây dựng cho quá trình phát triển thực tế. Nó được xây dựng trên nền tảng IntelliJ, vì vậy nó hiểu dự án của bạn giống như cách trình soạn thảo của bạn hiểu."
  URL: "https://junie.jetbrains.com/",
  lightSrc: "/images/logos/junie/junie-logo-on-white.svg",
  darkSrc: "/images/logos/junie/junie-logo-on-dark.svg",
  instructionsUrl: "https://junie.jetbrains.com/docs/agent-skills.html"
}, {
  Tên: "ZeroClaw",
  Mô tả: "ZeroClaw là một môi trường chạy tác nhân AI mã nguồn mở, ưu tiên ngôn ngữ Rust, dành cho các tác nhân cá nhân cục bộ, không phụ thuộc vào nhà cung cấp, với hỗ trợ Kỹ năng Tác nhân."
  URL: "https://www.zeroclawlabs.ai/",
  lightSrc: "/images/logos/zeroclaw/zeroclaw-logo-light.png",
  darkSrc: "/images/logos/zeroclaw/zeroclaw-logo-dark.png",
  tỉ lệ: 0,45,
  instructionsUrl: "https://docs.zeroclawlabs.ai/master/en/tools/skills.html",
  sourceCodeUrl: "https://github.com/zeroclaw-labs/zeroclaw"
}, {
  Tên: "Gemini CLI",
  Mô tả: "Gemini CLI là một tác nhân AI mã nguồn mở, mang sức mạnh của Gemini trực tiếp vào thiết bị đầu cuối của bạn."
  URL: "https://geminicli.com"
  lightSrc: "/images/logos/gemini-cli/gemini-cli-logo_light.svg",
  darkSrc: "/images/logos/gemini-cli/gemini-cli-logo_dark.svg",
  instructionsUrl: "https://geminicli.com/docs/cli/skills/",
  sourceCodeUrl: "https://github.com/google-gemini/gemini-cli"
}, {
  Tên: "Autohand Code CLI",
  Mô tả: "Autohand Code CLI là một tác nhân lập trình tự động dựa trên LLM, hoạt động ngay trong terminal của bạn. Nó sử dụng mô hình ReAct (Lý luận + Hành động) để hiểu mã nguồn của bạn, lập kế hoạch thay đổi và thực thi chúng với sự chấp thuận của bạn."
  URL: "https://autohand.ai/",
  lightSrc: "/images/logos/autohand/autohand-light.svg",
  darkSrc: "/images/logos/autohand/autohand-dark.svg",
  tỉ lệ: 0,8,
  instructionsUrl: "https://autohand.ai/docs/working-with-autohand-code/agent-skills.html",
  sourceCodeUrl: "https://github.com/autohandai/code-cli"
}, {
  Tên: "OpenCode",
  Mô tả: "OpenCode là một công cụ mã nguồn mở giúp bạn viết mã trong terminal, IDE hoặc máy tính để bàn."
  URL: "https://opencode.ai/",
  lightSrc: "/images/logos/opencode/opencode-wordmark-light.svg",
  darkSrc: "/images/logos/opencode/opencode-wordmark-dark.svg",
  instructionsUrl: "https://opencode.ai/docs/skills/",
  sourceCodeUrl: "https://github.com/sst/opencode"
}, {
  Tên: "OpenHands"
  Mô tả: "OpenHands là nền tảng mở dành cho các tác nhân lập trình trên đám mây. Mở rộng quy mô từ một đến hàng nghìn tác nhân — mã nguồn mở, không phụ thuộc vào mô hình và sẵn sàng cho doanh nghiệp."
  URL: "https://openhands.dev/",
  lightSrc: "/images/logos/openhands/openhands-logo-light.svg",
  darkSrc: "/images/logos/openhands/openhands-logo-dark.svg",
  instructionsUrl: "https://docs.openhands.dev/overview/skills",
  sourceCodeUrl: "https://github.com/OpenHands/OpenHands"
}, {
  Tên: "Mux",
  Mô tả: "Mux giúp bạn dễ dàng chạy các tác nhân lập trình song song, mỗi tác nhân có không gian làm việc riêng biệt, ngay từ trình duyệt hoặc máy tính để bàn của bạn. Mux là mã nguồn mở và không phụ thuộc vào nhà cung cấp LLM nào."
  URL: "https://mux.coder.com/",
  lightSrc: "/images/logos/mux/mux-editor-light.svg",
  darkSrc: "/images/logos/mux/mux-editor-dark.svg",
  tỉ lệ: 0,8,
  instructionsUrl: "https://mux.coder.com/agent-skills",
  sourceCodeUrl: "https://github.com/coder/mux"
}, {
  Tên: "Con trỏ"
  Mô tả: "Cursor là một trình soạn thảo và trợ lý lập trình AI. Sử dụng nó để hiểu mã nguồn của bạn, lập kế hoạch và xây dựng các tính năng, sửa lỗi, xem xét các thay đổi và làm việc với các công cụ bạn đang sử dụng."
  URL: "https://cursor.com/",
  lightSrc: "/images/logos/cursor/LOCKUP_HORIZONTAL_2D_LIGHT.svg",
  darkSrc: "/images/logos/cursor/LOCKUP_HORIZONTAL_2D_DARK.svg",
  instructionsUrl: "https://cursor.com/docs/context/skills"
}, {
  Tên: "Amp",
  Mô tả: "Amp là tác nhân mã hóa tiên tiến cho phép bạn khai thác tối đa sức mạnh của các mô hình hàng đầu."
  URL: "https://ampcode.com/",
  lightSrc: "/images/logos/amp/amp-logo-light.svg",
  darkSrc: "/images/logos/amp/amp-logo-dark.svg",
  tỉ lệ: 0,8,
  instructionsUrl: "https://ampcode.com/manual#agent-skills"
}, {
  Tên: "Letta",
  Mô tả: "Letta là nền tảng để xây dựng các tác nhân có trạng thái: Trí tuệ nhân tạo với bộ nhớ tiên tiến có thể học hỏi và tự cải thiện theo thời gian."
  URL: "https://www.letta.com/",
  lightSrc: "/images/logos/letta/Letta-logo-RGB_OffBlackonTransparent.svg",
  darkSrc: "/images/logos/letta/Letta-logo-RGB_GreyonTransparent.svg",
  instructionsUrl: "https://docs.letta.com/letta-code/skills/",
  sourceCodeUrl: "https://github.com/letta-ai/letta"
}, {
  Tên: "Người điều khiển lửa"
  Mô tả: "Firebender là tác nhân lập trình gốc Android đầu tiên có khả năng viết các tính năng, kiểm thử chúng trên trình giả lập và tự động sửa lỗi."
  URL: "https://firebender.com/",
  lightSrc: "/images/logos/firebender/firebender-wordmark-light.svg",
  darkSrc: "/images/logos/firebender/firebender-wordmark-dark.svg",
  instructionsUrl: "https://docs.firebender.com/multi-agent/skills"
}, {
  Tên: "Ngỗng"
  Mô tả: "Goose là một tác nhân AI mã nguồn mở, có khả năng mở rộng, vượt xa việc chỉ đưa ra gợi ý mã — cho phép cài đặt, thực thi, chỉnh sửa và kiểm thử với bất kỳ LLM nào."
  URL: "https://block.github.io/goose/",
  lightSrc: "/images/logos/goose/goose-logo-black.png",
  darkSrc: "/images/logos/goose/goose-logo-white.png",
  instructionsUrl: "https://block.github.io/goose/docs/guides/context-engineering/using-skills/",
  sourceCodeUrl: "https://github.com/block/goose"
}, {
  Tên: "GitHub Copilot"
  Mô tả: "GitHub Copilot hoạt động trực tiếp cùng bạn trong trình soạn thảo, đề xuất toàn bộ dòng lệnh hoặc toàn bộ hàm cho bạn."
  URL: "https://github.com/",
  lightSrc: "/images/logos/github/GitHub_Lockup_Dark.svg",
  darkSrc: "/images/logos/github/GitHub_Lockup_Light.svg",
  instructionsUrl: "https://docs.github.com/en/copilot/concepts/agents/about-agent-skills",
  sourceCodeUrl: "https://github.com/microsoft/vscode-copilot-chat"
}, {
  Tên: "VS Code",
  Mô tả: "Visual Studio Code kết hợp sự đơn giản của một trình soạn thảo mã với những gì các nhà phát triển cần cho chu trình chỉnh sửa-xây dựng-gỡ lỗi cốt lõi của họ."
  URL: "https://code.visualstudio.com/",
  lightSrc: "/images/logos/vscode/vscode.svg",
  darkSrc: "/images/logos/vscode/vscode-alt.svg",
  instructionsUrl: "https://code.visualstudio.com/docs/copilot/customization/agent-skills",
  sourceCodeUrl: "https://github.com/microsoft/vscode"
}, {
  Tên: "Claude Code",
  Mô tả: "Claude Code là một công cụ lập trình tự động, có khả năng đọc mã nguồn, chỉnh sửa tệp, chạy lệnh và tích hợp với các công cụ phát triển của bạn. Có sẵn trên terminal, IDE, ứng dụng máy tính để bàn và trình duyệt."
  URL: "https://claude.ai/code",
  lightSrc: "/images/logos/claude-code/Claude-Code-logo-Slate.svg",
  darkSrc: "/images/logos/claude-code/Claude-Code-logo-Ivory.svg",
  instructionsUrl: "https://code.claude.com/docs/en/skills"
}, {
  Tên: "Claude"
  Mô tả: "Claude là trí tuệ nhân tạo của Anthropic, được xây dựng dành cho những người giải quyết vấn đề. Giải quyết các thách thức phức tạp, phân tích dữ liệu, viết mã và suy nghĩ thấu đáo những công việc khó khăn nhất của bạn."
  URL: "https://claude.ai/",
  lightSrc: "/images/logos/claude-ai/Claude-logo-Slate.svg",
  darkSrc: "/images/logos/claude-ai/Claude-logo-Ivory.svg",
  instructionsUrl: "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview"
}, {
  Tên: "ChatGPT & Codex",
  Mô tả: "ChatGPT kết nối các tác nhân cho nhiều loại công việc khác nhau, bao gồm Codex cho phát triển phần mềm và ChatGPT Work cho các công việc rộng hơn. Sử dụng ChatGPT trên máy tính để bàn, web và thiết bị di động, với Codex cũng có sẵn trong trình soạn thảo và thiết bị đầu cuối của bạn."
  URL: "https://chatgpt.com/codex/",
  lightSrc: "/images/logos/chatgpt/light.svg",
  darkSrc: "/images/logos/chatgpt/dark.svg",
  instructionsUrl: "https://developers.openai.com/codex/skills/",
  sourceCodeUrl: "https://github.com/openai/codex"
}, {
  Tên: "Piebald"
  Mô tả: "Piebald là một ứng dụng dành cho máy tính để bàn và web giúp việc phát triển tác nhân trở nên dễ dàng hơn bao giờ hết, đồng thời cho phép bạn kiểm soát hoàn toàn cấu hình, ngữ cảnh và luồng hoạt động."
  URL: "https://piebald.ai",
  lightSrc: "/images/logos/piebald/Piebald_wordmark_light.svg",
  darkSrc: "/images/logos/piebald/Piebald_wordmark_dark.svg"
}, {
  Tên: "Nhà máy",
  Mô tả: "Factory là một nền tảng phát triển phần mềm tích hợp trí tuệ nhân tạo, hoạt động ở mọi nơi bạn làm việc. Từ IDE đến CI/CD — hãy giao phó toàn bộ các tác vụ như tái cấu trúc mã, xử lý sự cố và di chuyển dữ liệu cho các thiết bị Android mà không cần thay đổi công cụ, mô hình hoặc quy trình làm việc của bạn."
  URL: "https://factory.ai/",
  lightSrc: "/images/logos/factory/factory-logo-light.svg",
  darkSrc: "/images/logos/factory/factory-logo-dark.svg",
  instructionsUrl: "https://docs.factory.ai/cli/configuration/skills"
}, {
  Tên: "pi",
  Mô tả: "Pi là một công cụ lập trình terminal tối giản. Hãy điều chỉnh Pi cho phù hợp với quy trình làm việc của bạn, chứ không phải ngược lại."
  URL: "https://shittycodingagent.ai/",
  lightSrc: "/images/logos/pi/pi-logo-light.svg",
  darkSrc: "/images/logos/pi/pi-logo-dark.svg",
  tỉ lệ: 0,55,
  instructionsUrl: "https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md",
  sourceCodeUrl: "https://github.com/badlogic/pi-mono"
}, {
  Tên: "Databricks Genie Code",
  Mô tả: "Genie Code là một đối tác AI tự động được thiết kế chuyên dụng cho công việc xử lý dữ liệu trong Databricks."
  URL: "https://databricks.com/",
  lightSrc: "/images/logos/databricks/databricks-logo-light.svg",
  darkSrc: "/images/logos/databricks/databricks-logo-dark.svg",
  instructionsUrl: "https://docs.databricks.com/aws/en/assistant/skills"
}, {
  Tên: "Agentman"
  Mô tả: "Agentman là một nền tảng chăm sóc sức khỏe dựa trên trí tuệ nhân tạo. Nó tự động hóa quy trình thu nhập bằng cách sử dụng các tác nhân AI mà không làm giảm khả năng kiểm soát. Mọi hành động đều có thể kiểm thử, theo dõi và kiểm toán được."
  URL: "https://agentman.ai/",
  lightSrc: "/images/logos/agentman/agentman-wordmark-light.svg",
  darkSrc: "/images/logos/agentman/agentman-wordmark-dark.svg",
  instructionsUrl: "https://agentman.ai/agentskills"
}, {
  Tên: "TRAE",
  Mô tả: "Trae là một IDE AI thích ứng, giúp thay đổi cách bạn làm việc, cộng tác với bạn để làm việc nhanh hơn."
  URL: "https://trae.ai/",
  lightSrc: "/images/logos/trae/trae-logo-lightmode.svg",
  darkSrc: "/images/logos/trae/trae-logo-darkmode.svg",
  instructionsUrl: "https://www.trae.ai/blog/trae_tutorial_0115",
  sourceCodeUrl: "https://github.com/bytedance/trae-agent"
}, {
  Tên: "Spring AI",
  Mô tả: "Spring AI hướng đến việc đơn giản hóa quá trình phát triển các ứng dụng tích hợp chức năng trí tuệ nhân tạo mà không gây ra sự phức tạp không cần thiết."
  URL: "https://docs.spring.io/spring-ai/reference",
  lightSrc: "/images/logos/spring-ai/spring-ai-logo-light.svg",
  darkSrc: "/images/logos/spring-ai/spring-ai-logo-dark.svg",
  instructionsUrl: "https://spring.io/blog/2026/01/13/spring-ai-generic-agent-skills/",
  sourceCodeUrl: "https://github.com/spring-projects/spring-ai"
}, {
  Tên: "Roo Code",
  Mô tả: "Roo Code tích hợp toàn bộ nhóm phát triển AI ngay trong trình soạn thảo của bạn, vượt trội hơn các công cụ khép kín nhờ khả năng hiểu sâu sắc toàn bộ dự án, lập trình tác nhân đa bước và tính linh hoạt hướng đến nhà phát triển chưa từng có."
  URL: "https://roocode.com",
  lightSrc: "/images/logos/roo-code/roo-code-logo-black.svg",
  darkSrc: "/images/logos/roo-code/roo-code-logo-white.svg",
  instructionsUrl: "https://docs.roocode.com/features/skills",
  sourceCodeUrl: "https://github.com/RooCodeInc/Roo-Code"
}, {
  Tên: "Mistral AI Vibe",
  Mô tả: "Mistral Vibe là một trợ lý lập trình dòng lệnh được hỗ trợ bởi các mô hình của Mistral. Nó cung cấp giao diện đàm thoại cho mã nguồn của bạn, cho phép bạn sử dụng ngôn ngữ tự nhiên để khám phá, chỉnh sửa và tương tác với các dự án của mình thông qua một bộ công cụ mạnh mẽ."
  URL: "https://github.com/mistralai/mistral-vibe",
  lightSrc: "/images/logos/mistral-vibe/vibe-logo_black.svg",
  darkSrc: "/images/logos/mistral-vibe/vibe-logo_white.svg",
  tỉ lệ: 0,55,
  instructionsUrl: "https://github.com/mistralai/mistral-vibe",
  sourceCodeUrl: "https://github.com/mistralai/mistral-vibe"
}, {
  Tên: "Mã lệnh",
  Mô tả: "Command Code là một tác nhân lập trình liên tục học hỏi sở thích lập trình của bạn. Mô hình AI thần kinh-biểu tượng meta taste-1 của chúng tôi với khả năng học tăng cường liên tục kết hợp LLM với sở thích lập trình của bạn."
  URL: "https://commandcode.ai/",
  lightSrc: "/images/logos/command-code/command-code-logo-for-light.svg",
  darkSrc: "/images/logos/command-code/command-code-logo-for-dark.svg",
  Tỷ lệ: 1,33,
  instructionsUrl: "https://commandcode.ai/docs/skills"
}, {
  Tên: "Ona",
  Mô tả: "Ona là một nền tảng dành cho các tác nhân chạy ngầm. Vận hành một nhóm kỹ sư phần mềm AI trên đám mây. Được điều phối, quản lý và bảo mật ở cấp độ nhân hệ điều hành."
  URL: "https://ona.com"
  lightSrc: "/images/logos/ona/ona-wordmark-light.svg",
  darkSrc: "/images/logos/ona/ona-wordmark-dark.svg",
  tỉ lệ: 0,8,
  instructionsUrl: "https://ona.com/docs/ona/agents-md#skills-for-repository-specific-workflows"
}, {
  Tên: "Mã VT",
  Mô tả: "VT Code là một tác nhân mã hóa mã nguồn mở với khả năng hiểu mã gốc LLM và tính an toàn shell mạnh mẽ. Hỗ trợ nhiều nhà cung cấp LLM với khả năng chuyển đổi dự phòng tự động và quản lý ngữ cảnh hiệu quả."
  URL: "https://github.com/vinhnx/vtcode",
  lightSrc: "/images/logos/vtcode/vt_code_light.svg",
  darkSrc: "/images/logos/vtcode/vt_code_dark.svg",
  instructionsUrl: "https://github.com/vinhnx/vtcode/blob/main/docs/skills/SKILLS_GUIDE.md",
  sourceCodeUrl: "https://github.com/vinhnx/VTCode"
}, {
  Tên: "Qodo",
  Mô tả: "Qodo là một nền tảng toàn vẹn mã nguồn dựa trên trí tuệ nhân tạo (AI) để xem xét, kiểm thử và viết mã, tích hợp AI vào quy trình phát triển nhằm tăng cường chất lượng mã ở mọi giai đoạn."
  URL: "https://www.qodo.ai/",
  lightSrc: "/images/logos/qodo/qodo-logo-light.png",
  darkSrc: "/images/logos/qodo/qodo-logo-dark.svg",
  instructionsUrl: "https://www.qodo.ai/blog/how-i-use-qodos-agent-skills-to-auto-fix-issues-in-pull-requests/"
}, {
  Tên: "Laravel Boost",
  Mô tả: "Laravel Boost tăng tốc quá trình phát triển ứng dụng hỗ trợ bởi trí tuệ nhân tạo bằng cách cung cấp các hướng dẫn thiết yếu và kỹ năng cho các tác nhân AI, giúp họ viết các ứng dụng Laravel chất lượng cao, tuân thủ các thực tiễn tốt nhất của Laravel."
  URL: "https://github.com/laravel/boost",
  lightSrc: "/images/logos/laravel-boost/boost-light-mode.svg",
  darkSrc: "/images/logos/laravel-boost/boost-dark-mode.svg",
  instructionsUrl: "https://laravel.com/docs/12.x/boost#agent-skills",
  sourceCodeUrl: "https://github.com/laravel/boost"
}, {
  Tên: "Emdash",
  Mô tả: "Emdash là một ứng dụng máy tính để bàn không phụ thuộc vào nhà cung cấp, cho phép bạn chạy nhiều tác nhân lập trình song song, mỗi tác nhân được cách ly trong cây thư mục Git riêng, cục bộ hoặc qua SSH trên máy từ xa."
  URL: "https://emdash.sh",
  lightSrc: "/images/logos/emdash/emdash-logo-light.svg",
  darkSrc: "/images/logos/emdash/emdash-logo-dark.svg",
  instructionsUrl: "https://docs.emdash.sh/skills",
  sourceCodeUrl: "https://github.com/generalaction/emdash"
}, {
  Tên: "Mã nguồn Snowflake Cortex",
  Mô tả: "Cortex Code là một tác nhân thông minh được điều khiển bởi trí tuệ nhân tạo, tích hợp vào nền tảng Snowflake, được tối ưu hóa cho các tác vụ kỹ thuật dữ liệu phức tạp, phân tích, học máy và xây dựng tác nhân."
  URL: "https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code",
  lightSrc: "/images/logos/snowflake/snowflake-logo-light.svg",
  darkSrc: "/images/logos/snowflake/snowflake-logo-dark.svg",
  instructionsUrl: "https://docs.snowflake.com/en/user-guide/cortex-code/extensibility#extensibility-skills"
}, {
  Tên: "Kiro",
  Mô tả: "Kiro giúp bạn làm việc hiệu quả nhất bằng cách tạo cấu trúc cho việc lập trình AI thông qua phát triển dựa trên đặc tả."
  URL: "https://kiro.dev/",
  lightSrc: "/images/logos/kiro/kiro-logo-light.svg",
  darkSrc: "/images/logos/kiro/kiro-logo-dark.svg",
  instructionsUrl: "https://kiro.dev/docs/skills/"
}, {
  Tên: "Xưởng",
  Mô tả: "Workshop là một tác nhân lập trình AI đa nền tảng để xây dựng các ứng dụng hoàn chỉnh. Nó hỗ trợ nhiều mô hình LLM, tác nhân phụ, tác nhân tùy chỉnh và kỹ năng — có sẵn dưới dạng ứng dụng máy tính để bàn, ứng dụng web và giao diện dòng lệnh (CLI)."
  URL: "https://workshop.ai/",
  lightSrc: "/images/logos/workshop/workshop-logo-light.svg",
  darkSrc: "/images/logos/workshop/workshop-logo-dark.svg",
  instructionsUrl: "https://docs.workshop.ai/core-concepts/working-with-the-agent#create-your-own-agents"
}, {
  Tên: "Google AI Edge Gallery",
  Mô tả: "Google AI Edge Gallery là điểm đến hàng đầu để chạy các mô hình ngôn ngữ lớn (LLM) mã nguồn mở mạnh mẽ nhất thế giới trên thiết bị di động của bạn".
  URL: "https://github.com/google-ai-edge/gallery",
  lightSrc: "/images/logos/google-ai-edge-gallery/google-ai-edge-gallery-light.svg",
  darkSrc: "/images/logos/google-ai-edge-gallery/google-ai-edge-gallery-dark.svg",
  tỉ lệ: 0,45,
  instructionsUrl: "https://github.com/google-ai-edge/gallery/tree/main/skills",
  sourceCodeUrl: "https://github.com/google-ai-edge/gallery"
}, {
  Tên: "nanobot",
  Mô tả: "Nanobot là một trợ lý AI cá nhân siêu nhẹ, mã nguồn mở. Nó hoạt động trên nhiều nền tảng — terminal, Telegram, Discord, Slack, WeChat, và nhiều hơn nữa — với hỗ trợ MCP tích hợp và hệ thống kỹ năng để mở rộng."
  URL: "https://nanobot.wiki/",
  lightSrc: "/images/logos/nanobot/nanobot-logo-light.png",
  darkSrc: "/images/logos/nanobot/nanobot-logo-dark.png",
  instructionsUrl: "https://nanobot.wiki/docs/0.1.5/use-nanobot/skills",
  sourceCodeUrl: "https://github.com/HKUDS/nanobot"
}, {
  tên: "fast-agent",
  Mô tả: "fast-agent là một cách đơn giản, có thể mở rộng để tương tác với LLM. Rất phù hợp cho việc lập trình, đ