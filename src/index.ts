export default {
  async fetch(req: Request): Promise<Response> {
    try {
      // 북마크 목록 ID 설정 (필요에 따라 변경)
      const bookmarkListId = "5dc83bf226254a9d833873224ff3e44f";
      const apiUrl = `https://pages.map.naver.com/save-pages/api/maps-bookmark/v3/shares/${bookmarkListId}/bookmarks?placeInfo=true&start=0&limit=20&sort=lastUseTime&createIdNo=true`;

      // API 요청
      const apiResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        },
      });

      if (!apiResponse.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await apiResponse.json();
      const bookmarkList = data.bookmarkList.map((b: any) => b.sid);

      // JSON 형식으로 데이터 반환
      return new Response(JSON.stringify({ bookmarkList }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // 오류 발생 시 500 응답 반환
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  },
} satisfies ExportedHandler;
