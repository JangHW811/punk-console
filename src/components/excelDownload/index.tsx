"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";
import * as XLSX from "xlsx";

/**
 * CSV 데이터(2차원 배열)를 엑셀 파일로 다운로드하는 유틸리티 함수
 * @param data - 2차원 배열 형태의 데이터 (첫 번째 행은 헤더로 사용)
 * @param fileName - 다운로드할 파일명 (기본값: 현재 날짜 포함)
 */
export const downloadExcelFromData = (
  data: (string | number)[][],
  fileName?: string
) => {
  if (!data || data.length === 0) {
    console.warn("다운로드할 데이터가 없습니다.");
    return;
  }

  // 워크시트 생성
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // 컬럼 너비 자동 조정
  const headers = data[0] || [];
  const rows = data.slice(1);
  const columnWidths = headers.map((_, colIndex) => {
    const maxLength = Math.max(
      String(headers[colIndex] || "").length,
      ...rows.map((row) => String(row[colIndex] || "").length)
    );
    return { wch: Math.max(maxLength + 2, 10) };
  });
  worksheet["!cols"] = columnWidths;

  // 워크북 생성 및 파일 다운로드
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 파일명 설정
  const finalFileName =
    fileName || `export_${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(workbook, finalFileName);
};

interface ExcelDownloadProps {
  /** 테이블이 있는 경우 사용할 ref */
  tableRef?: React.RefObject<HTMLTableElement>;
  /** CSV 데이터가 있는 경우 사용할 데이터 (2차원 배열, 첫 번째 행은 헤더) */
  data?: (string | number)[][];
  /** 다운로드할 파일명 */
  fileName?: string;
  /** 버튼 표시 여부 */
  showButton?: boolean;
  /** 버튼 텍스트 */
  buttonText?: string;
}

const ExcelDownload = ({
  tableRef: externalTableRef,
  data,
  fileName,
  showButton = true,
  buttonText = "엑셀 다운로드",
}: ExcelDownloadProps) => {
  const internalTableRef = useRef<HTMLTableElement>(null);
  const tableRef = externalTableRef || internalTableRef;

  const handleDownload = () => {
    // CSV 데이터가 제공된 경우
    if (data) {
      downloadExcelFromData(data, fileName);
      return;
    }

    // 테이블에서 데이터 추출
    if (!tableRef.current) {
      console.warn("테이블 또는 데이터가 없습니다.");
      return;
    }

    const table = tableRef.current;
    const headers: string[] = [];
    const rows: string[][] = [];

    // 헤더 추출
    const thead = table.querySelector("thead");
    if (thead) {
      const headerRow = thead.querySelector("tr");
      if (headerRow) {
        const headerCells = headerRow.querySelectorAll("th");
        headerCells.forEach((cell) => {
          headers.push(cell.textContent || "");
        });
      }
    }

    // 데이터 행 추출
    const tbody = table.querySelector("tbody");
    if (tbody) {
      const dataRows = tbody.querySelectorAll("tr");
      dataRows.forEach((row) => {
        const rowData: string[] = [];
        const cells = row.querySelectorAll("td");
        cells.forEach((cell) => {
          rowData.push(cell.textContent || "");
        });
        rows.push(rowData);
      });
    }

    // 워크북 생성
    const worksheetData = [headers, ...rows];
    downloadExcelFromData(worksheetData, fileName);
  };

  return (
    <div className="space-y-4">
      {showButton && (
        <div className="flex justify-end">
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="size-4" />
            {buttonText}
          </Button>
        </div>
      )}
      {!data && (
        <div className="overflow-x-auto">
          <table
            ref={tableRef}
            className="w-full border-collapse border border-gray-300"
          >
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Age
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">John</td>
                <td className="border border-gray-300 px-4 py-2">25</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">John</td>
                <td className="border border-gray-300 px-4 py-2">25</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">John</td>
                <td className="border border-gray-300 px-4 py-2">25</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">John</td>
                <td className="border border-gray-300 px-4 py-2">25</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelDownload;
