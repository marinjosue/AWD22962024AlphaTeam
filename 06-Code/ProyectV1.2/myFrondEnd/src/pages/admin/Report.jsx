import React, { useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import '../../styles/report.css';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

Chart.register(...registerables);

const Report = () => {
  useEffect(() => {
    const courses = ["Meditación", "Yoga", "Mindfulness", "Relajación", "Masajes"];
    const mostSold = [150, 120, 100, 90, 80];
    const leastSold = [10, 15, 20, 25, 30];
    const abandonedCourses = [20, 25, 10, 15, 5];
    const completedCourses = [100, 110, 90, 85, 80];

    const createBarChart = (ctx, labels, data, title, bgColor, borderColor) => {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            backgroundColor: bgColor,
            borderColor: borderColor,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } }
        }
      });
    };

    const createPieChart = (ctx, labels, data, title) => {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#F44336']
          }]
        },
        options: { responsive: true }
      });
    };

    const mostSoldCtx = document.getElementById("mostSoldChart").getContext("2d");
    createBarChart(mostSoldCtx, courses, mostSold, "Cursos Más Vendidos", "rgba(54, 162, 235, 0.5)", "rgba(54, 162, 235, 1)");

    const leastSoldCtx = document.getElementById("leastSoldChart").getContext("2d");
    createBarChart(leastSoldCtx, courses, leastSold, "Cursos Menos Vendidos", "rgba(255, 99, 132, 0.5)", "rgba(255, 99, 132, 1)");

    const abandonedCoursesCtx = document.getElementById("abandonedCoursesChart").getContext("2d");
    createPieChart(abandonedCoursesCtx, courses, abandonedCourses, "Cursos Abandonados");

    const completedCoursesCtx = document.getElementById("completedCoursesChart").getContext("2d");
    createPieChart(completedCoursesCtx, courses, completedCourses, "Cursos Completados");
  }, []);

  const downloadPdf = async () => {
    const pdf = new jsPDF();
    const charts = [
      { id: "mostSoldChart", title: "Cursos Más Vendidos" },
      { id: "leastSoldChart", title: "Cursos Menos Vendidos" },
      { id: "abandonedCoursesChart", title: "Cursos Abandonados" },
      { id: "completedCoursesChart", title: "Cursos Completados" }
    ];
    let yPosition = 10;
    for (const chart of charts) {
      const canvas = document.getElementById(chart.id);
      const imgData = await html2canvas(canvas).then(canvas => canvas.toDataURL("image/png"));
      pdf.text(chart.title, 10, yPosition);
      pdf.addImage(imgData, "PNG", 10, yPosition + 10, 180, 100);
      yPosition += 120;
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 10;
      }
    }
    pdf.text("Reporte General y Ganancias", 10, yPosition + 10);
    pdf.text("Ganancia Total: $12,750", 10, yPosition + 20);
    pdf.text("Ganancia Promedio por Curso: $2,550", 10, yPosition + 30);
    pdf.text("Curso con Más Ganancia: Meditación ($4,500)", 10, yPosition + 40);
    pdf.save("Reportes_Cursos.pdf");
  };

  return (
    <div>
      <AdminHeader />
      <main>
        <h1>Reportes de Cursos</h1>
        <div className="container">
          <section className="report">
            <h2>Cursos Más Vendidos</h2>
            <canvas id="mostSoldChart"></canvas>
            <p className="description">
              Este gráfico muestra los cursos más populares entre nuestros estudiantes. Analiza cuáles son los cursos con mayor número de ventas para identificar tendencias de interés.
            </p>
          </section>
          <section className="report">
            <h2>Cursos Menos Vendidos</h2>
            <canvas id="leastSoldChart"></canvas>
            <p className="description">
              Aquí se destacan los cursos con menor número de ventas. Esta información puede ser útil para identificar áreas de mejora o la necesidad de ajustes en la oferta.
            </p>
          </section>
          <section className="report">
            <h2>Cursos Abandonados</h2>
            <canvas id="abandonedCoursesChart"></canvas>
            <p className="description">
              Este gráfico detalla los cursos que fueron iniciados pero no completados. Nos ayuda a entender dónde se encuentran los principales puntos de abandono.
            </p>
          </section>
          <section className="report">
            <h2>Cursos Completados</h2>
            <canvas id="completedCoursesChart"></canvas>
            <p className="description">
              Los datos presentados aquí reflejan los cursos que han sido completados exitosamente. Representan los logros de los estudiantes y el impacto de nuestras ofertas.
            </p>
          </section>
          <section className="txtreport">
            <h2>Reporte General</h2>
            <p>
              Este reporte brinda una visión detallada del desempeño de nuestros cursos. Los gráficos interactivos te permiten identificar patrones en las ventas, el abandono y la finalización de los cursos. Usa esta información para tomar decisiones estratégicas que mejoren la experiencia educativa de los usuarios.
            </p>
            <h2>Ganancias Simuladas</h2>
            <p>
              Basado en el número de cursos vendidos:
            </p>
            <ul>
              <li>Ganancia total: $12,750</li>
              <li>Ganancia promedio por curso: $2,550</li>
              <li>Cursos con más ganancia: Meditación ($4,500)</li>
            </ul>
            <p className="description">
              Estas cifras son simuladas para dar una idea del rendimiento financiero general.
            </p>
            <h2>Cursos Destacados</h2>
            <ol>
              <li>Curso de Desarrollo Web Avanzado</li>
              <li>Curso de Inteligencia Artificial</li>
              <li>Curso de Ciberseguridad</li>
              <li>Curso de Ciencia de Datos</li>
              <li>Curso de Marketing Digital</li>
            </ol>
            <p className="description">
              Esta lista muestra algunos de los cursos más destacados y recomendados por nuestros expertos. Estos cursos han recibido excelentes valoraciones y han demostrado ser altamente efectivos.
            </p>
          </section>
        </div>
        <button id="downloadPdf" className="btn-pdf" onClick={downloadPdf}>Generar PDF</button>
      </main>
      <Footer />
    </div>
  );
};

export default Report;
