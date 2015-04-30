package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("\n");
      out.write("<head>\n");
      out.write("\n");
      out.write(" <script src=\"https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.6.1/CustomElements.js\"></script>\n");
      out.write(" <script src=\"lib/com/org/util/nsUtil.js\"></script>\n");
      out.write(" <script src=\"lib/com/org/base/nsUIComponent.js\"></script>\n");
      out.write(" <script src=\"lib/com/org/containers/nsGroup.js\"></script>\n");
      out.write(" <script src=\"lib/com/org/components/nsCheckBox.js\"></script>\n");
      out.write(" \n");
      out.write("</head>\n");
      out.write("\n");
      out.write("<body onload=\"onload()\">\n");
      out.write("\n");
      out.write("\t<ns-checkBox id=\"chkBox\" label=\"Check\" change=\"selectionChange(event)\"></ns-checkBox>\n");
      out.write("\t<input type=\"button\" value=\"Change Label\" onclick=\"changeText()\">\n");
      out.write("\t</input>\n");
      out.write("\t<input type=\"button\" value=\"Change Layout\" onclick=\"changeLayout()\">\n");
      out.write("\t</input>\n");
      out.write("\t<script>\n");
      out.write("\tvar count = 0;\n");
      out.write("\tvar layoutDirection = nsCheckBox.LayoutDirection_LTR;\n");
      out.write("\tfunction onload()\n");
      out.write("\t{\n");
      out.write("\t\tvar checkBox  = document.getElementById(\"chkBox\");\n");
      out.write("\t\t//checkBox.addEventListener(\"change\", selectionChange);\n");
      out.write("\t}\n");
      out.write("\tfunction changeText()\n");
      out.write("\t{\n");
      out.write("\t\tcount++;\n");
      out.write("\t\tvar checkBox  = document.getElementById(\"chkBox\");\n");
      out.write("\t\tchkBox.setAttribute(\"label\",(\"Check\" + count));\n");
      out.write("\t}\n");
      out.write("\tfunction changeLayout()\n");
      out.write("\t{\n");
      out.write("\t\tvar checkBox  = document.getElementById(\"chkBox\");\n");
      out.write("\t\tif(layoutDirection === nsCheckBox.LayoutDirection_LTR)\n");
      out.write("\t\t{\n");
      out.write("\t\t\tlayoutDirection = nsCheckBox.LayoutDirection_RTL;\n");
      out.write("\t\t}\n");
      out.write("\t\telse\n");
      out.write("\t\t{\n");
      out.write("\t\t\tlayoutDirection = nsCheckBox.LayoutDirection_LTR;\n");
      out.write("\t\t}\n");
      out.write("\t\tchkBox.setAttribute(\"layoutdirection\",layoutDirection);\n");
      out.write("\t}\n");
      out.write("\tfunction selectionChange(event)\n");
      out.write("\t{\n");
      out.write("\t\talert(\"Selection Change \" + event.detail);\t\t\n");
      out.write("\t}\n");
      out.write("\t// \tvar checkBox = document.createElement(\"ns-checkBox\");\n");
      out.write("\t// \tcheckBox.text = \"Check\";\n");
      out.write("\t// \tdocument.body.appendChild(checkBox);     \n");
      out.write("\t</script>\n");
      out.write("\n");
      out.write("</body>\n");
      out.write("\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
